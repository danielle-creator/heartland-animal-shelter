import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  bulkUpsertSiteContent,
  createAnimal,
  createOrder,
  createPost,
  createProduct,
  createVariant,
  deleteAnimal,
  deletePost,
  deleteProduct,
  deleteVariant,
  getAllAnimals,
  getAllOrders,
  getAllPosts,
  getAllProducts,
  getAllSiteContent,
  getAnimalById,
  getAvailableAnimals,
  getFeaturedAnimals,
  getOrderWithItems,
  getPostById,
  getPostBySlug,
  getProductWithVariants,
  getPublishedPosts,
  getSiteContentBySection,
  updateAnimal,
  updateOrderStatus,
  updatePost,
  updateProduct,
  updateVariant,
  upsertSiteContent,
} from "./db";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

// ─── Admin guard ──────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── Shop (public) ────────────────────────────────────────────────────────────
const shopRouter = router({
  listProducts: publicProcedure
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const all = await getAllProducts(true);
      if (input?.category) return all.filter((p) => p.category === input.category);
      return all;
    }),

  getProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const product = await getProductWithVariants(input.id);
      if (!product) throw new TRPCError({ code: "NOT_FOUND" });
      return product;
    }),

  createOrder: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        shippingAddress: z.string().optional(),
        notes: z.string().optional(),
        items: z.array(
          z.object({
            productId: z.number(),
            variantId: z.number().optional(),
            productName: z.string(),
            variantLabel: z.string().optional(),
            quantity: z.number().min(1),
            unitPrice: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const subtotal = input.items.reduce(
        (sum, item) => sum + parseFloat(item.unitPrice) * item.quantity,
        0
      );
      const orderId = await createOrder(
        {
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          shippingAddress: input.shippingAddress,
          notes: input.notes,
          subtotal: subtotal.toFixed(2),
          total: subtotal.toFixed(2),
          status: "pending",
        },
        input.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          productName: item.productName,
          variantLabel: item.variantLabel,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: (parseFloat(item.unitPrice) * item.quantity).toFixed(2),
        }))
      );
      return { orderId, total: subtotal.toFixed(2) };
    }),
});

// ─── News (public) ────────────────────────────────────────────────────────────
const newsRouter = router({
  listPosts: publicProcedure
    .input(z.object({ limit: z.number().optional(), category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const posts = await getPublishedPosts(input?.limit);
      if (input?.category) return posts.filter((p) => p.category === input.category);
      return posts;
    }),

  getPost: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getPostBySlug(input.slug);
      if (!post || !post.published) throw new TRPCError({ code: "NOT_FOUND" });
      return post;
    }),
});

// ─── Admin (protected) ────────────────────────────────────────────────────────
const adminRouter = router({
  listAllPosts: adminProcedure.query(async () => getAllPosts()),

  createPost: adminProcedure
    .input(
      z.object({
        title: z.string(),
        titleEs: z.string().optional(),
        slug: z.string(),
        excerpt: z.string().optional(),
        excerptEs: z.string().optional(),
        body: z.string().optional(),
        bodyEs: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().optional(),
        publishedAt: z.date().optional(),
        authorName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createPost({
        ...input,
        published: input.published ?? false,
        publishedAt: input.publishedAt ?? (input.published ? new Date() : undefined),
      });
      return { success: true };
    }),

  updatePost: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        titleEs: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        excerptEs: z.string().optional(),
        body: z.string().optional(),
        bodyEs: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().optional(),
        publishedAt: z.date().optional(),
        authorName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      if (data.published && !data.publishedAt) data.publishedAt = new Date();
      await updatePost(id, data);
      return { success: true };
    }),

  deletePost: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deletePost(input.id);
      return { success: true };
    }),

  translatePost: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const post = await getPostById(input.id);
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content:
              "You are a professional Spanish translator specializing in animal welfare content. Translate the provided text naturally and warmly into Spanish (Latin American). Return JSON with keys: titleEs, excerptEs, bodyEs.",
          },
          {
            role: "user",
            content: JSON.stringify({ title: post.title, excerpt: post.excerpt, body: post.body }),
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "translation",
            strict: true,
            schema: {
              type: "object",
              properties: {
                titleEs: { type: "string" },
                excerptEs: { type: "string" },
                bodyEs: { type: "string" },
              },
              required: ["titleEs", "excerptEs", "bodyEs"],
              additionalProperties: false,
            },
          },
        },
      });
      const translated = JSON.parse(response.choices[0].message.content as string);
      await updatePost(input.id, translated);
      return { success: true, ...translated };
    }),

  listAllProducts: adminProcedure.query(async () => getAllProducts(false)),

  createProduct: adminProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        salePrice: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        hasVariants: z.boolean().optional(),
        stock: z.number().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createProduct({ ...input, hasVariants: input.hasVariants ?? false, stock: input.stock ?? 0, active: true });
      return { success: true };
    }),

  updateProduct: adminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        salePrice: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        hasVariants: z.boolean().optional(),
        stock: z.number().optional(),
        active: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateProduct(id, data);
      return { success: true };
    }),

  deleteProduct: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteProduct(input.id);
      return { success: true };
    }),

  createVariant: adminProcedure
    .input(
      z.object({
        productId: z.number(),
        size: z.string().optional(),
        color: z.string().optional(),
        price: z.string().optional(),
        stock: z.number(),
        sku: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createVariant({ ...input, active: true });
      return { success: true };
    }),

  updateVariant: adminProcedure
    .input(
      z.object({
        id: z.number(),
        size: z.string().optional(),
        color: z.string().optional(),
        price: z.string().optional(),
        stock: z.number().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateVariant(id, data);
      return { success: true };
    }),

  deleteVariant: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteVariant(input.id);
      return { success: true };
    }),

  listOrders: adminProcedure.query(async () => getAllOrders(200)),

  getOrder: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const order = await getOrderWithItems(input.id);
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });
      return order;
    }),

  updateOrderStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "paid", "fulfilled", "cancelled", "refunded"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateOrderStatus(input.id, input.status);
      return { success: true };
    }),
});

// ─── Animals (public) ────────────────────────────────────────────────────────
const animalsRouter = router({
  listAvailable: publicProcedure
    .input(z.object({ species: z.enum(["dog", "cat", "other"]).optional() }).optional())
    .query(async ({ input }) => getAvailableAnimals(input?.species)),

  listFeatured: publicProcedure
    .input(z.object({ limit: z.number().optional() }).optional())
    .query(async ({ input }) => getFeaturedAnimals(input?.limit ?? 6)),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const a = await getAnimalById(input.id);
      if (!a) throw new TRPCError({ code: "NOT_FOUND" });
      return a;
    }),
});

// ─── CMS Content (public read) ────────────────────────────────────────────────
const cmsRouter = router({
  getSection: publicProcedure
    .input(z.object({ section: z.string() }))
    .query(async ({ input }) => getSiteContentBySection(input.section)),

  getAll: publicProcedure.query(async () => getAllSiteContent()),
});

// ─── Admin: Animals ───────────────────────────────────────────────────────────
const adminAnimalsRouter = router({
  list: adminProcedure.query(async () => getAllAnimals()),

  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        species: z.enum(["dog", "cat", "other"]).default("dog"),
        breed: z.string().optional(),
        age: z.string().optional(),
        sex: z.enum(["male", "female", "unknown"]).optional(),
        size: z.enum(["small", "medium", "large", "xlarge"]).optional(),
        color: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        status: z.enum(["available", "pending", "adopted", "foster", "hold"]).default("available"),
        goodWithKids: z.boolean().optional(),
        goodWithDogs: z.boolean().optional(),
        goodWithCats: z.boolean().optional(),
        specialNeeds: z.boolean().optional(),
        specialNeedsNote: z.string().optional(),
        adoptionFee: z.string().optional(),
        featured: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const id = await createAnimal({
        ...input,
        featured: input.featured ?? false,
        sortOrder: input.sortOrder ?? 0,
      });
      return { success: true, id };
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        species: z.enum(["dog", "cat", "other"]).optional(),
        breed: z.string().optional(),
        age: z.string().optional(),
        sex: z.enum(["male", "female", "unknown"]).optional(),
        size: z.enum(["small", "medium", "large", "xlarge"]).optional(),
        color: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        status: z.enum(["available", "pending", "adopted", "foster", "hold"]).optional(),
        goodWithKids: z.boolean().optional(),
        goodWithDogs: z.boolean().optional(),
        goodWithCats: z.boolean().optional(),
        specialNeeds: z.boolean().optional(),
        specialNeedsNote: z.string().optional(),
        adoptionFee: z.string().optional(),
        featured: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateAnimal(id, data);
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteAnimal(input.id);
      return { success: true };
    }),

  reorder: adminProcedure
    .input(z.array(z.object({ id: z.number(), sortOrder: z.number() })))
    .mutation(async ({ input }) => {
      for (const item of input) {
        await updateAnimal(item.id, { sortOrder: item.sortOrder });
      }
      return { success: true };
    }),
});

// ─── Admin: CMS Content ───────────────────────────────────────────────────────
const adminCmsRouter = router({
  getAll: adminProcedure.query(async () => getAllSiteContent()),

  set: adminProcedure
    .input(
      z.object({
        key: z.string(),
        value: z.string(),
        label: z.string().optional(),
        contentType: z.string().optional(),
        section: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await upsertSiteContent(input.key, input.value, input.label, input.contentType, input.section);
      return { success: true };
    }),

  bulkSet: adminProcedure
    .input(
      z.array(
        z.object({
          key: z.string(),
          value: z.string(),
          label: z.string().optional(),
          contentType: z.string().optional(),
          section: z.string().optional(),
        })
      )
    )
    .mutation(async ({ input }) => {
      await bulkUpsertSiteContent(input);
      return { success: true };
    }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  shop: shopRouter,
  news: newsRouter,
  animals: animalsRouter,
  cms: cmsRouter,
  admin: adminRouter,
  adminAnimals: adminAnimalsRouter,
  adminCms: adminCmsRouter,
});

export type AppRouter = typeof appRouter;
