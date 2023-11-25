import { pgSchema, text, varchar } from 'drizzle-orm/pg-core';
export const mySchema = pgSchema('pepecon');

export const emojis = mySchema.table('emojis', {
	id: varchar('id', {
		length: 256
	}).primaryKey(),
	name: varchar('name', {
		length: 256
	}).notNull(),
	src: text('src').notNull()
});
