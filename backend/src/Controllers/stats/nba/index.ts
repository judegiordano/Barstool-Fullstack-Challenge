import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Requests } from "@Services/Requests";
import { Redis } from "@Services/Redis";
import { INBAGameData } from "@Types/Abstract";
import { CacheKeys } from "@Types/Constants";
import { Utility } from "@Services/Utility";
import { GameDataRepository } from "@Repositories/Nba/GameDataRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.client],
		schema: {
			tags: ["Stats"],
			summary: "get latest nba game stat"
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;

		const redisData = await Redis.GetAsync(CacheKeys.NBA_STATS);

		if (!redisData) {
			const { data } = await Requests.Get("6c974274-4bfc-4af8-a9c4-8b926637ba74.json");
			const stats = data as INBAGameData;
			await Redis.SetAsync(CacheKeys.NBA_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
			await GameDataRepository.InsertGame(stats);

			return {
				ok: true,
				data: stats
			};
		}

		const { data, lastUpdated } = JSON.parse(redisData as string);
		const diff = Utility.GetDiffInSeconds(new Date(lastUpdated), new Date());

		if (diff >= 60) {
			const { data } = await Requests.Get("6c974274-4bfc-4af8-a9c4-8b926637ba74.json");
			const stats = data as INBAGameData;
			await Redis.SetAsync(CacheKeys.NBA_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
			await GameDataRepository.InsertGame(stats);

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