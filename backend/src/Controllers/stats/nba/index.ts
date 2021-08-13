import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { INBAGameData } from "@barstool-dev/types";

import { CacheKeys, Endpoints } from "@Types/Constants";
import { Requests } from "@Services/Requests";
import { Redis } from "@Services/Redis";
import { Utility } from "@Services/Utility";
import { GameDataRepository } from "@Repositories/Nba/GameDataRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.client],
		schema: {
			tags: ["Stats"],
			summary: "get latest or cached nba game stat"
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;

		const redisData = await Redis.GetAsync(CacheKeys.NBA_STATS);

		if (!redisData) {
			const { data } = await Requests.Get(Endpoints.NBA);
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
			const { data } = await Requests.Get(Endpoints.NBA);
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