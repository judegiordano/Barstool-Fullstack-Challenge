import plugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Config } from "@Services/Config";

const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
		const { appcode } = request.headers;

		if (!appcode) {
			reply.statusCode = 401;
			throw new Error("missing authorization");
		}

		if (appcode != Options.APPCODE) {
			reply.statusCode = 401;
			throw new Error("unautorized");
		}
	});
});