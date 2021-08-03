import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Requests } from "@Services/Requests";
import { Redis } from "@Services/Redis";
import { INBAGameData } from "@Types/Abstract";
import { CacheKeys } from "@Types/Constants";

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
		if (redisData) {
			return {
				ok: true,
				data: JSON.parse(redisData as string)
			};
		}

		const { data } = await Requests.Get("6c974274-4bfc-4af8-a9c4-8b926637ba74.json");
		const stats = data as INBAGameData;
		await Redis.SetAsync(CacheKeys.NBA_STATS, JSON.stringify(stats));

		return {
			ok: true,
			data: stats
		};
	});
};