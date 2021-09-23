import { FastifyInstance } from "fastify";
import { IMLBGameData } from "@barstool-dev/types";

import { GameDataRepository as Game } from "@Repositories/Mlb/GameDataRepository";
import { MlbGameDataSchema } from "@Types/Schemas/MLB";
import { ReuqestInstance } from "@Types/Override";
import { MlbGameData } from "@Models/MLB/MlbGameData";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.put<ReuqestInstance>("/:id", {
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
			description: "takes an entire game object, replaces the current entry, and returns the updated object",
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
	}, async (req, res) => {
		res.statusCode = 200;
		const { id } = req.params;
		const manager = req.em.getRepository(MlbGameData);
		const game = await Game.UpdateGame(manager, id, req.body as IMLBGameData);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};