import { pgTable, text, serial, integer, decimal, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const listingTypeEnum = pgEnum("listing_type", ["sell", "rent"]);
export const sellerTypeEnum = pgEnum("seller_type", ["individual", "agency"]);
export const conditionEnum = pgEnum("condition", ["new", "good", "used", "needs_repair"]);
export const regionEnum = pgEnum("region", ["north", "center", "east", "west", "south"]);

export const wilayasTable = pgTable("wilayas", {
  id: text("id").primaryKey(),
  code: integer("code").notNull(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  region: regionEnum("region").notNull(),
});

export const categoriesTable = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  icon: text("icon").notNull(),
  description: text("description"),
});

export const listingsTable = pgTable("listings", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  type: listingTypeEnum("type").notNull(),
  categoryId: text("category_id").notNull().references(() => categoriesTable.id),
  wilayaId: text("wilaya_id").notNull().references(() => wilayasTable.id),
  city: text("city").notNull(),
  address: text("address"),
  images: text("images").array().notNull().default([]),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: decimal("area", { precision: 8, scale: 2 }),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  furnished: boolean("furnished").default(false),
  condition: conditionEnum("condition"),
  sellerName: text("seller_name").notNull(),
  sellerPhone: text("seller_phone").notNull(),
  sellerAvatar: text("seller_avatar"),
  sellerType: sellerTypeEnum("seller_type").notNull().default("individual"),
  agencyName: text("agency_name"),
  featured: boolean("featured").notNull().default(false),
  verified: boolean("verified").notNull().default(false),
  views: integer("views").notNull().default(0),
  amenities: text("amenities").array().default([]),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  listingId: text("listing_id").notNull().references(() => listingsTable.id),
  senderName: text("sender_name").notNull(),
  senderPhone: text("sender_phone").notNull(),
  senderEmail: text("sender_email"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertListingSchema = createInsertSchema(listingsTable).omit({
  views: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messagesTable).omit({
  id: true,
  createdAt: true,
});

export type Listing = typeof listingsTable.$inferSelect;
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Wilaya = typeof wilayasTable.$inferSelect;
export type Category = typeof categoriesTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;
