export interface Env {
	WORKOUT_DATA: KVNamespace;
}

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: CORS });
		}

		const url = new URL(request.url);
		const headers = { 'Content-Type': 'application/json', ...CORS };

		if (request.method === 'GET') {
			const key = url.searchParams.get('key');
			if (!key) return new Response(JSON.stringify({ error: 'missing key' }), { status: 400, headers });
			const value = await env.WORKOUT_DATA.get(key);
			return new Response(value ?? 'null', { headers });
		}

		if (request.method === 'PUT') {
			const { key, value } = await request.json<{ key: string; value: unknown }>();
			if (!key) return new Response(JSON.stringify({ error: 'missing key' }), { status: 400, headers });
			await env.WORKOUT_DATA.put(key, JSON.stringify(value));
			return new Response(JSON.stringify({ ok: true }), { headers });
		}

		return new Response('Not found', { status: 404 });
	},
};
