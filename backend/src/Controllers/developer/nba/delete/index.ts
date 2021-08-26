import { FastifyInstance } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";
import { ReuqestInstance } from "@Types/Override";
import { NbaGameData } from "@Models/NBA/NbaGameData";

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
					type: "object",
					properties: {
						ok: { type: "boolean" },
						data: { type: "boolean" }
					}
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { id } = req.params;
		const manager = req.em.getRepository(NbaGameData);
		return {
			ok: true,
			data: await Game.DeleteById(manager, id)
		};
	});
};