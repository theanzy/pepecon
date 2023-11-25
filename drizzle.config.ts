import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
export default {
	schema: './src/lib/db/drizzle/schema/*',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DB_URL!
	},
	schemaFilter: ['pepecon']
} satisfies Config;
