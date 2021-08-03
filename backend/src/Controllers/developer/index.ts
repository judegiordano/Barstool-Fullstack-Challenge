import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Database } from "@Services/Database";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "test conneciton / subscription",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						connected: { type: "boolean" },
						database: { type: "string" },
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const status = Database.GetStatus();
		return {
			ok: true,
			connected: status.isConnected,
			database: status.driver.database
		};
	});
};