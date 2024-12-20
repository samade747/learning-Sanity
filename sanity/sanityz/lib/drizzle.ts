import { pgTable, varchar, integer, serial } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const cartTable = pgTable("cart", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(), // Corrected from 'integar' to 'integer'
    createdAt: varchar("created_at", { length: 255 }).notNull(),
    updatedAt: varchar("updated_at", { length: 255 }).notNull(),
});

export const db = drizzle(sql);
