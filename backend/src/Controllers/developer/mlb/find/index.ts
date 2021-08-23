import { FastifyInstance } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Mlb/GameDataRepository";
import { MlbGameDataSchema } from "@Types/Schemas/MLB";

interface IParams {
	id: number
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<{ Params: IParams }>("/id/:id", {
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
			summary: "find a game by id",
			description: "find a game object by id",
			response: {
				200: {
					ok: { type: "boolean" },
					data: MlbGameDataSchema
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { id } = req.params;
		const game = await Game.FindById(id);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};