import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Redis } from "@Services/Redis";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/flush", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "clear redis cache",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						done: { type: "string" },
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const done = await Redis.FlushAsync();
		return {
			ok: true,
			done
		};
	});
};