import { DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
const queryClient = postgres(DB_URL);
export const db = drizzle(queryClient);
