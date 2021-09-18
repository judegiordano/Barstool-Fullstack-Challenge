import { FastifyInstance } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";
import { NbaGameDataSchema } from "@Types/Schemas/NBA";
import { ReuqestInstance } from "@Types/Override";
import { NbaGameData } from "@Models/NBA/NbaGameData";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<ReuqestInstance>("/:uid", {
		preValidation: [fastify.client],
		schema: {
			params: {
				type: "object",
				required: ["uid"],
				properties: {
					uid: { type: "string" }
				}
			},
			tags: ["Live"],
			summary: "find a game by uid",
			description: "find a game object by uid",
			response: {
				200: {
					ok: { type: "boolean" },
					data: NbaGameDataSchema
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { uid } = req.params;
		const manager = req.em.getRepository(NbaGameData);
		const game = await Game.FindByUid(manager, uid);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};