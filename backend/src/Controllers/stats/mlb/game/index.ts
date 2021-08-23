import { FastifyInstance } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Mlb/GameDataRepository";
import { MlbGameDataSchema } from "@Types/Schemas/MLB";

interface IParams {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<{ Params: IParams }>("/:uid", {
		preValidation: [fastify.developer],
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
					data: MlbGameDataSchema
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { uid } = req.params;
		const game = await Game.FindByUid(uid);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};