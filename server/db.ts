import { and, asc, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertAnimal,
  InsertNewsPost,
  InsertOrder,
  InsertOrderItem,
  InsertProduct,
  InsertProductVariant,
  InsertSiteContent,
  InsertUser,
  animals,
  newsPosts,
  orderItems,
  orders,
  productVariants,
  products,
  siteContent,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach((field) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  });
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getAllProducts(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  if (activeOnly) {
    return db
      .select()
      .from(products)
      .where(eq(products.active, true))
      .orderBy(asc(products.sortOrder), asc(products.name));
  }
  return db.select().from(products).orderBy(asc(products.sortOrder), asc(products.name));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function getProductWithVariants(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const product = await getProductById(id);
  if (!product) return undefined;
  const variants = await db
    .select()
    .from(productVariants)
    .where(and(eq(productVariants.productId, id), eq(productVariants.active, true)));
  return { ...product, variants };
}

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(products).values(data);
}

export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(products).set({ active: false }).where(eq(products.id, id));
}

// ─── Product Variants ─────────────────────────────────────────────────────────
export async function getVariantsByProductId(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(productVariants)
    .where(and(eq(productVariants.productId, productId), eq(productVariants.active, true)));
}

export async function createVariant(data: InsertProductVariant) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(productVariants).values(data);
}

export async function updateVariant(id: number, data: Partial<InsertProductVariant>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(productVariants).set(data).where(eq(productVariants.id, id));
}

export async function deleteVariant(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(productVariants).set({ active: false }).where(eq(productVariants.id, id));
}

// ─── Orders ───────────────────────────────────────────────────────────────────
export async function createOrder(orderData: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [result] = await db.insert(orders).values(orderData).$returningId();
  const orderId = result.id;
  const itemsWithOrderId = items.map((item) => ({ ...item, orderId }));
  await db.insert(orderItems).values(itemsWithOrderId);
  for (const item of items) {
    if (item.variantId) {
      await db
        .update(productVariants)
        .set({ stock: sql`stock - ${item.quantity}` })
        .where(eq(productVariants.id, item.variantId));
    } else if (item.productId) {
      await db
        .update(products)
        .set({ stock: sql`stock - ${item.quantity}` })
        .where(eq(products.id, item.productId));
    }
  }
  return orderId;
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result[0];
}

export async function getOrderWithItems(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const order = await getOrderById(id);
  if (!order) return undefined;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return { ...order, items };
}

export async function getAllOrders(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit);
}

export async function updateOrderStatus(
  id: number,
  status: "pending" | "paid" | "fulfilled" | "cancelled" | "refunded"
) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(orders).set({ status }).where(eq(orders.id, id));
}

// ─── News Posts ───────────────────────────────────────────────────────────────
export async function getPublishedPosts(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  const query = db
    .select()
    .from(newsPosts)
    .where(eq(newsPosts.published, true))
    .orderBy(desc(newsPosts.publishedAt));
  if (limit) return query.limit(limit);
  return query;
}

export async function getAllPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsPosts).orderBy(desc(newsPosts.createdAt));
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(newsPosts).where(eq(newsPosts.slug, slug)).limit(1);
  return result[0];
}

export async function getPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(newsPosts).where(eq(newsPosts.id, id)).limit(1);
  return result[0];
}

export async function createPost(data: InsertNewsPost) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(newsPosts).values(data);
}

export async function updatePost(id: number, data: Partial<InsertNewsPost>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(newsPosts).set(data).where(eq(newsPosts.id, id));
}

export async function deletePost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(newsPosts).where(eq(newsPosts.id, id));
}

// ─── Site Content (CMS) ───────────────────────────────────────────────────────
export async function getAllSiteContent() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent).orderBy(asc(siteContent.section), asc(siteContent.key));
}

export async function getSiteContentBySection(section: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent).where(eq(siteContent.section, section));
}

export async function getSiteContentByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
  return result[0];
}

export async function upsertSiteContent(
  key: string,
  value: string,
  label?: string,
  contentType?: string,
  section?: string
) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const existing = await getSiteContentByKey(key);
  if (existing) {
    await db
      .update(siteContent)
      .set({
        value,
        ...(label ? { label } : {}),
        ...(contentType ? { contentType } : {}),
        ...(section ? { section } : {}),
      })
      .where(eq(siteContent.key, key));
  } else {
    await db.insert(siteContent).values({
      key,
      value,
      label: label ?? key,
      contentType: contentType ?? "text",
      section: section ?? "general",
    });
  }
}

export async function bulkUpsertSiteContent(
  items: { key: string; value: string; label?: string; contentType?: string; section?: string }[]
) {
  for (const item of items) {
    await upsertSiteContent(item.key, item.value, item.label, item.contentType, item.section);
  }
}

// ─── Animals ──────────────────────────────────────────────────────────────────
export async function getAllAnimals() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(animals).orderBy(asc(animals.sortOrder), desc(animals.createdAt));
}

export async function getAvailableAnimals(species?: "dog" | "cat" | "other") {
  const db = await getDb();
  if (!db) return [];
  const conditions: ReturnType<typeof eq>[] = [eq(animals.status, "available")];
  if (species) conditions.push(eq(animals.species, species));
  return db
    .select()
    .from(animals)
    .where(and(...conditions))
    .orderBy(asc(animals.sortOrder), desc(animals.featured));
}

export async function getFeaturedAnimals(limit = 6) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(animals)
    .where(and(eq(animals.status, "available"), eq(animals.featured, true)))
    .orderBy(asc(animals.sortOrder))
    .limit(limit);
}

export async function getAnimalById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(animals).where(eq(animals.id, id)).limit(1);
  return result[0];
}

export async function createAnimal(data: InsertAnimal) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [result] = await db.insert(animals).values(data).$returningId();
  return result.id;
}

export async function updateAnimal(id: number, data: Partial<InsertAnimal>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(animals).set(data).where(eq(animals.id, id));
}

export async function deleteAnimal(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(animals).where(eq(animals.id, id));
}
