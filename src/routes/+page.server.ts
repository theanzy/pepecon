import { db } from '$lib/db/drizzle';
import { emojis } from '$lib/db/drizzle/schema';

export async function load({ depends }) {
	depends('/');
	async function getEmojis() {
		const result = await db
			.select({
				id: emojis.id,
				name: emojis.name,
				src: emojis.src
			})
			.from(emojis);
		console.log('emojis', result);
		return result;
	}

	return { streamed: { emojis: getEmojis() } };
}
