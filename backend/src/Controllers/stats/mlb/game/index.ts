import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Mlb/GameDataRepository";
import { MlbGameDataSchema } from "@Types/Schemas/MLB";

interface IRequest {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/:uid", {
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
	}, async (req: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		const { uid } = req.params as IRequest;
		const game = await Game.FindByUid(uid);
		return {
			ok: true,
			data: game.toJSON()
		};
	});
};