import plugin from "fastify-plugin";
import helmet from "fastify-helmet";
import { FastifyInstance } from "fastify";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(helmet, {
		contentSecurityPolicy: false,
		enableCSPNonces: false
	});
});