
import plugin from "fastify-plugin";
import swagger from "fastify-swagger";
import { FastifyInstance } from "fastify";

import { Config } from "@Services/Config";

const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(swagger, {
		routePrefix: `/api/${Options.APP_VERSION}/docs`,
		swagger: {
			info: {
				title: "Barstool Dev Rest Api",
				description: "Documentation for Barstool Sports dev api",
				version: Options.APP_VERSION,
			},
			schemes: [Options.IS_PROD ? "https" : "http"],
			consumes: ["application/json"],
			produces: ["application/json"],
			tags: [
				{ name: "Dev", description: "Dev Related Endpoints (private)" },
				{ name: "Live", description: "Live Game Statistic Related Endpoints (public)" }
			]
		},
		exposeRoute: true
	});
});