import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { MockDataRepository as Mock } from "@Repositories/MockDataRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/game", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "insert a new game object"
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const newGame = await Mock.MockNbaGame();
		return {
			ok: true,
			data: newGame
		};
	});
};