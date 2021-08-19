import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";

interface IRequest {
	id: number
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/id/:id", {
		preValidation: [fastify.developer],
		schema: {
			params: {
				type: "object",
				required: ["id"],
				properties: {
					id: { type: "number" }
				}
			},
			tags: ["Dev"],
			summary: "find a game by id"
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const { id } = req.params as IRequest;
		const game = await Game.FindById(id);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};