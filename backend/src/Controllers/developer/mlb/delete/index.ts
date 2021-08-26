import { FastifyInstance } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Mlb/GameDataRepository";
import { ReuqestInstance } from "@Types/Override";
import { MlbGameData } from "@Models/MLB/MlbGameData";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.delete<ReuqestInstance>("/id/:id", {
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
					ok: { type: "boolean" },
					data: { type: "boolean" }
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { id } = req.params;
		const manager = req.em.getRepository(MlbGameData);
		const game = await Game.DeleteById(manager, id);
		return {
			ok: true,
			data: game
		};
	});
};