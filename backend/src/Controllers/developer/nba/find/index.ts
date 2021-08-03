import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { NbaGameDataRepository } from "@Repositories/NbaGameDataRepository";

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
		const game = await NbaGameDataRepository.FindOneById(id);
		return {
			ok: true,
			data: game
		};
	});
};