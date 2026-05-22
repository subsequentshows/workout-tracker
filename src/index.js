// src/index.js — source thẳng, không bundle
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, { headers });
		}

		if (request.method === "GET") {
			return new Response(JSON.stringify({
				pathname: url.pathname,
				rawUrl: url.toString(),
				key: url.searchParams.get("key"),
				allParams: [...url.searchParams.entries()]
			}), { headers });
		}

		if (request.method === "PUT") {
			const body = await request.json();
			return new Response(JSON.stringify(body), { headers });
		}

		return new Response("Not found", { status: 404 });
	},
};
// export {
// 	index_default as default
// };
//# sourceMappingURL=index.js.map
