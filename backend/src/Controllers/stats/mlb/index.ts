import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Requests } from "@Services/Requests";
import { Redis } from "@Services/Redis";
import { CacheKeys, Endpoints } from "@Types/Constants";
import { IMLBGameData } from "@Types/Mlb/Abstract";
import { Utility } from "@Services/Utility";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.client],
		schema: {
			tags: ["Stats"],
			summary: "get latest or cached mlb game stat"
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;

		const redisData = await Redis.GetAsync(CacheKeys.MLB_STATS);

		if (!redisData) {
			const { data } = await Requests.Get(Endpoints.MLB);
			const stats = data as IMLBGameData;
			await Redis.SetAsync(CacheKeys.MLB_STATS, JSON.stringify({ lastUpdated: new Date(), data: stats }));
			// await GameDataRepository.InsertGame(stats);

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
			// await GameDataRepository.InsertGame(stats);

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