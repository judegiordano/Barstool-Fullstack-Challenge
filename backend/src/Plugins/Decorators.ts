import plugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Config } from "@Services/Config";

const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.decorate("developer", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { appsubscription: sub } = request.headers;
			if (!sub) throw "missing subscription";
			if (sub !== Options.DEV_SUBSCRIPTION) throw "invalid subscription";
		} catch (error) {
			reply.statusCode = 401;
			throw new Error(error);
		}
	});
	fastify.decorate("client", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { appsubscription: sub } = request.headers;
			if (!sub) throw "missing subscription";
			if (sub !== Options.DEV_SUBSCRIPTION)
				if (sub !== Options.CLIENT_SUBSCRIPTION) throw "invalid subscription";
		} catch (error) {
			reply.statusCode = 401;
			throw new Error(error);
		}
	});
});