import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IMLBGameData } from "@barstool-dev/types";

import { GameDataRepository as Game } from "@Repositories/Mlb/GameDataRepository";
import { MlbGameDataSchema } from "@Types/Schemas/MLB";

interface IRequest {
	id: number
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.patch("/:id", {
		preValidation: [fastify.developer],
		schema: {
			params: {
				type: "object",
				required: ["id"],
				properties: {
					id: { type: "number" }
				}
			},
			body: MlbGameDataSchema,
			tags: ["Dev"],
			summary: "update a game by id",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						game: MlbGameDataSchema
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const { id } = req.params as IRequest;
		const game = await Game.UpdateGame(id, req.body as IMLBGameData);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};