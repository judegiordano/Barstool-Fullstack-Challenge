import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { NbaGameDataRepository as Game } from "@Repositories/NbaGameDataRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/game", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "insert a new game object"
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const newGame = await Game.SeedMockData();
		return {
			ok: true,
			data: newGame
		};
	});
};