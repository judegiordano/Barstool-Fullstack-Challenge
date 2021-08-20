import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";

interface IRequest {
	id: number
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.delete("/id/:id", {
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
			summary: "Delete a game by id",
			description: "delete a game object by id",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						data: { type: "boolean" }
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const { id } = req.params as IRequest;
		return {
			ok: true,
			data: await Game.DeleteById(id)
		};
	});
};