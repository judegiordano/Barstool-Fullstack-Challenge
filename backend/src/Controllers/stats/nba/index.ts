import { FastifyInstance } from "fastify";
import { INBAGameData } from "@barstool-dev/types";

import { CacheKeys, Endpoints } from "@Types/Constants";
import { Requests } from "@Services/Requests";
import { Redis } from "@Services/Redis";
import { Utility } from "@Services/Utility";
import { GameDataRepository } from "@Repositories/Nba/GameDataRepository";
import { NbaGameDataSchema } from "@Types/Schemas/NBA";
import { NbaGameData } from "@Models/NBA/NbaGameData";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.client],
		schema: {
			tags: ["Live"],
			summary: "get latest or cached nba game stat",
			description: "check for recently cached game object. If none exists, fetch a new instance and cache that",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						data: NbaGameDataSchema
					}
				}
			}
		}
	}, async (req, res) => {
		res.statusCode = 200;

		const redisData = await Redis.GetAsync(CacheKeys.NBA_STATS);
		const manager = req.em.getRepository(NbaGameData);

		if (!redisData) {
			const { data } = await Requests.Get(Endpoints.NBA);
			const stats = data as INBAGameData;
			await Redis.SetAsync(CacheKeys.NBA_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
			await GameDataRepository.InsertGame(manager, stats);

			return {
				ok: true,
				data: stats
			};
		}

		const { data, lastUpdated } = JSON.parse(redisData as string);
		const diff = Utility.GetDiffInSeconds(new Date(lastUpdated), new Date());

		if (diff >= 60) {
			const { data } = await Requests.Get(Endpoints.NBA);
			const stats = data as INBAGameData;
			await Redis.SetAsync(CacheKeys.NBA_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
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