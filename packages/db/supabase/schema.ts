import { integer, pgTable, serial, text} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  image_url: text("image_url"),
  category: integer("category").references(() => category.id),
  description: text("description"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name"),
  image_url: text("image_url"),
  parent_category: text("parent_category"),
  description: text("description"),
});
