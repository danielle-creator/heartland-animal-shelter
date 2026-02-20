import {
  boolean,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Shop Products ────────────────────────────────────────────────────────────
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  salePrice: decimal("salePrice", { precision: 10, scale: 2 }),
  imageUrl: text("imageUrl"),
  category: varchar("category", { length: 100 }),
  /** Whether this product has size/color variants */
  hasVariants: boolean("hasVariants").default(false).notNull(),
  /** Total stock for products without variants */
  stock: int("stock").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// ─── Product Variants (size/color options) ────────────────────────────────────
export const productVariants = mysqlTable("product_variants", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  /** e.g. "S", "M", "L", "XL", "One Size" */
  size: varchar("size", { length: 50 }),
  /** e.g. "Red", "Blue", "Teal" */
  color: varchar("color", { length: 50 }),
  /** Override price for this variant (null = use product price) */
  price: decimal("price", { precision: 10, scale: 2 }),
  stock: int("stock").default(0).notNull(),
  sku: varchar("sku", { length: 100 }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  /** Stripe payment intent or session ID */
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  status: mysqlEnum("status", ["pending", "paid", "fulfilled", "cancelled", "refunded"])
    .default("pending")
    .notNull(),
  customerName: varchar("customerName", { length: 255 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 50 }),
  shippingAddress: text("shippingAddress"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// ─── Order Items ──────────────────────────────────────────────────────────────
export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  variantId: int("variantId"),
  productName: varchar("productName", { length: 255 }).notNull(),
  variantLabel: varchar("variantLabel", { length: 100 }),
  quantity: int("quantity").notNull(),
  unitPrice: decimal("unitPrice", { precision: 10, scale: 2 }).notNull(),
  lineTotal: decimal("lineTotal", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

// ─── News Posts ───────────────────────────────────────────────────────────────
export const newsPosts = mysqlTable("news_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  body: text("body"),
  imageUrl: text("imageUrl"),
  category: varchar("category", { length: 100 }).default("News"),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  authorName: varchar("authorName", { length: 255 }).default("Heartland Team"),
  /** Spanish translations (auto-generated via AI) */
  titleEs: varchar("titleEs", { length: 500 }),
  excerptEs: text("excerptEs"),
  bodyEs: text("bodyEs"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type NewsPost = typeof newsPosts.$inferSelect;
export type InsertNewsPost = typeof newsPosts.$inferInsert;

// ─── Volunteer Submissions ────────────────────────────────────────────────────
export const volunteerSubmissions = mysqlTable("volunteer_submissions", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  zip: varchar("zip", { length: 20 }),
  availability: varchar("availability", { length: 255 }),
  interests: text("interests"),
  experience: text("experience"),
  howHeard: varchar("howHeard", { length: 255 }),
  status: mysqlEnum("status", ["new", "contacted", "active", "inactive"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type VolunteerSubmission = typeof volunteerSubmissions.$inferSelect;
export type InsertVolunteerSubmission = typeof volunteerSubmissions.$inferInsert;

// ─── Foster Applications ──────────────────────────────────────────────────────
export const fosterApplications = mysqlTable("foster_applications", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  zip: varchar("zip", { length: 20 }),
  /** Type of animal they want to foster */
  animalPreference: varchar("animalPreference", { length: 100 }),
  /** e.g. kittens, puppies, seniors, medical, behavioral */
  fosterType: varchar("fosterType", { length: 255 }),
  homeType: varchar("homeType", { length: 100 }),
  hasChildren: boolean("hasChildren").default(false),
  hasOtherPets: boolean("hasOtherPets").default(false),
  otherPetsDescription: text("otherPetsDescription"),
  experience: text("experience"),
  availability: varchar("availability", { length: 255 }),
  additionalInfo: text("additionalInfo"),
  status: mysqlEnum("status", ["new", "contacted", "approved", "active", "inactive"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type FosterApplication = typeof fosterApplications.$inferSelect;
export type InsertFosterApplication = typeof fosterApplications.$inferInsert;
