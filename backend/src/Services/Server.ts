import path from "path";
import fastify, { FastifyError } from "fastify";
import AutoLoad from "fastify-autoload";

import { Config } from "./Config";
import { Database } from "./Database";
import { Redis } from "./Redis";

const { Options } = Config;

export class App {

	public static instance = fastify({ logger: !Options.IS_PROD });

	private static async Setup(): Promise<void> {
		// import middleware
		App.instance.register(import("../Middleware/Auth"));
		App.instance.register(import("../Middleware/AppSubscription"));
		// dynamic register plugins
		App.instance.register(AutoLoad, {
			dir: path.join(__dirname, "../Plugins"),
		});
		// dynamic register routes
		App.instance.register(AutoLoad, {
			dir: path.join(__dirname, "../Controllers"),
			options: { prefix: `/api/${Options.APP_VERSION}/` },
			routeParams: false
		});
		App.instance.setErrorHandler(async (error: FastifyError) => {
			console.error(error, error.stack);
			return {
				ok: false,
				status: error.statusCode ?? 500,
				data: error.message
			};
		});
		Redis.client.on("connect", () => {
			console.log(`connected to redis server: ${Redis.client.connected}`);
		});
		Redis.client.on("error", (err) => {
			console.log("Redis error.", err);
		});
	}

	public static async Start(): Promise<void> {
		try {
			await App.Setup();
			await Database.Connect();
			await App.instance.listen(Options.PORT, Options.IS_PROD ? "0.0.0.0" : "127.0.0.1");
		} catch (e) {
			console.log(e);
			await App.instance.close();
			await Database.Close();
			process.exit(1);
		}
	}
}