import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Requests } from "@Services/Requests";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.client],
		schema: {
			tags: ["Stats"],
			summary: "get latest mlb game stat"
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const { data } = await Requests.Get("eed38457-db28-4658-ae4f-4d4d38e9e212.json");
		return {
			ok: true,
			data
		};
	});
};