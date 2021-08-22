import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Live"],
			summary: "Get all game uids",
			description: "Get all game uids",
			response: {
				200: {
					ok: { type: "boolean" },
					data: {
						type: "array", items: { type: "string" }
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const games = await Game.GetAllUids();
		return {
			ok: true,
			data: games
		};
	});
};