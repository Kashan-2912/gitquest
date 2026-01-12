import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const creatures = pgTable('creatures', {
  id: uuid('id').primaryKey().defaultRandom(),
  githubProfileUrl: text('github_profile_url').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  contributions: integer('contributions').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updateAt: timestamp('updated_at').defaultNow().notNull(),
});

export type SelectCreature = typeof creatures.$inferSelect;
export type InsertCreature = typeof creatures.$inferInsert;