import plugin from "fastify-plugin";
import { FastifyInstance, FastifyRequest } from "fastify";

import { Config } from "@Services/Config";

const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.decorate("developer", async (request: FastifyRequest) => {
		const { appsubscription: sub } = request.headers;
		if (!sub) throw "missing subscription";
		if (sub !== Options.DEV_SUBSCRIPTION) throw new Error("invalid subscription");
	});
	fastify.decorate("client", async (request: FastifyRequest) => {
		const { appsubscription: sub } = request.headers;
		if (!sub) throw "missing subscription";
		if (sub !== Options.DEV_SUBSCRIPTION)
			if (sub !== Options.CLIENT_SUBSCRIPTION) throw new Error("invalid subscription");
	});
});