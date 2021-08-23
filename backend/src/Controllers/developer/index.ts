import { FastifyInstance } from "fastify";

import { Database } from "@Services/Database";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "test conneciton / subscription",
			description: "check if conenciton to database is live",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						connected: { type: "boolean" }
					}
				}
			}
		}
	}, async (_, res) => {
		res.statusCode = 200;
		return {
			ok: true,
			connected: await Database.GetStatus()
		};
	});
};