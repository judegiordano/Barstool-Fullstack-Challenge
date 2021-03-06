import { FastifyInstance } from "fastify";
import { IMLBGameData } from "@barstool-dev/types";

import { Requests } from "@Services/Requests";
import { Redis } from "@Services/Redis";
import { CacheKeys, Endpoints } from "@Types/Constants";
import { Utility } from "@Services/Utility";
import { GameDataRepository } from "@Repositories/Mlb/GameDataRepository";
import { MlbGameDataSchema } from "@Types/Schemas/MLB";
import { MlbGameData } from "@Models/MLB/MlbGameData";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.client],
		schema: {
			tags: ["Live"],
			summary: "get latest or cached mlb game stat",
			description: "check for recently cached game object. If none exists, fetch a new instance and cache that",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						data: MlbGameDataSchema
					}
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;

		const redisData = await Redis.GetAsync(CacheKeys.MLB_STATS);
		const manager = req.em.getRepository(MlbGameData);

		if (!redisData) {
			const { data } = await Requests.Get(Endpoints.MLB);
			const stats = data as IMLBGameData;
			await Redis.SetAsync(CacheKeys.MLB_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
			await GameDataRepository.InsertGame(manager, stats);

			return {
				ok: true,
				data: stats
			};
		}

		const { data, lastUpdated } = JSON.parse(redisData as string);
		const diff = Utility.GetDiffInSeconds(new Date(lastUpdated), new Date());

		if (diff >= 60) {
			const { data } = await Requests.Get(Endpoints.MLB);
			const stats = data as IMLBGameData;
			await Redis.SetAsync(CacheKeys.MLB_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
			await GameDataRepository.InsertGame(manager, stats);

			return {
				ok: true,
				data: stats
			};
		}

		return {
			ok: true,
			data
		};
	});
};