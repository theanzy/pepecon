import { db } from '$lib/db/drizzle/index.js';
import { emojis } from '$lib/db/drizzle/schema/index.js';
import { json } from '@sveltejs/kit';
import { PostgresError } from 'postgres';

export async function POST({ request }) {
	const body = await request.json();
	const { id, name, src } = body;

	if (!id) {
		return json(
			{
				error: 'id is required'
			},
			{
				status: 400
			}
		);
	}

	if (!name) {
		return json(
			{
				error: 'name is required'
			},
			{
				status: 400
			}
		);
	}

	if (!src) {
		return json(
			{
				error: 'src is required'
			},
			{
				status: 400
			}
		);
	}

	try {
		await db.insert(emojis).values({
			id: id,
			name: name,
			src: src
		});
	} catch (err) {
		if (err instanceof PostgresError) {
			if (err.detail?.includes('already exists')) {
				return json(
					{ error: 'id already exists. try a different one' },
					{
						status: 400
					}
				);
			}
			console.log('err', err);
		}
		return json(
			{
				error: 'error insert emoji'
			},
			{
				status: 400
			}
		);
	}

	return json('OK', {
		status: 200
	});
}
