import { FastifyInstance } from "fastify";

import { GameDataRepository as Game } from "@Repositories/Nba/GameDataRepository";
import { ReuqestInstance } from "@Types/Override";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<ReuqestInstance>("/:page", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Live"],
			summary: "Paginate game uids",
			description: "Paginate game uids",
			params: {
				required: ["page"],
				type: "object",
				properties: {
					page: { type: "number", minimum: 1 }
				}
			},
			querystring: {
				required: ["limit"],
				type: "object",
				properties: {
					limit: { type: "number", maximum: 10 }
				}
			},
			response: {
				200: {
					ok: { type: "boolean" },
					data: {
						type: "array", items: { type: "string" }
					}
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;
		const { page } = req.params;
		const { limit } = req.query;
		const games = await Game.GetAllUids(page, limit);
		return {
			ok: true,
			data: games
		};
	});
};