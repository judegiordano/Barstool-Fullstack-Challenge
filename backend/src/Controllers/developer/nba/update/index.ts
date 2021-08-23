import { FastifyInstance } from "fastify";
import { INBAGameData } from "@barstool-dev/types";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";
import { NbaGameDataSchema } from "@Types/Schemas/NBA";
import { ReuqestInstance } from "@Types/Override";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.patch<ReuqestInstance>("/:id", {
		preValidation: [fastify.developer],
		schema: {
			params: {
				type: "object",
				required: ["id"],
				properties: {
					id: { type: "number" }
				}
			},
			body: NbaGameDataSchema,
			tags: ["Dev"],
			summary: "update a game by id",
			description: "takes an entire game object, replaces the current entry, and returns the updated object",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						game: NbaGameDataSchema
					}
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { id } = req.params;
		const game = await Game.UpdateGame(id, req.body as INBAGameData);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};