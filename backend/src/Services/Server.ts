import path from "path";
import fastify, { FastifyError } from "fastify";
import AutoLoad from "fastify-autoload";

import { Config } from "./Config";
import { Database } from "./Database";
import { Redis } from "./Redis";
import { Log } from "./Logger";

const { Options } = Config;

export class App {

	private static instance = fastify({ logger: !Options.IS_PROD });

	private static async Setup(): Promise<void> {
		App.instance.register(import("../Middleware/Auth"));
		App.instance.register(import("../Middleware/AppSubscription"));
		App.instance.register(AutoLoad, {
			dir: path.join(__dirname, "../Plugins"),
		});
		App.instance.register(AutoLoad, {
			dir: path.join(__dirname, "../Controllers"),
			options: { prefix: `/api/${Options.APP_VERSION}/` },
			routeParams: false
		});
		App.instance.setErrorHandler(async (error: FastifyError) => {
			Log.Error(error, error.stack as string, "application error");
			return {
				ok: false,
				status: error.statusCode ?? 500,
				data: error.message
			};
		});
		// connect to Redis
		Redis.client.on("connect", () => {
			Log.Info("connected to redis server", "Redis");
		});
		Redis.client.on("error", (err) => {
			Log.Error(err, err.stack || err.stackTrace, "Redis");
		});
	}

	public static async Start(): Promise<void> {
		try {
			await App.Setup();
			await Database.Connect();
			await App.instance.listen(Options.PORT, Options.IS_PROD ? "0.0.0.0" : "127.0.0.1");
		} catch (e) {
			Log.Error(e, e.stack || e.stackTrace, "Application Error");
			await App.instance.close();
			await Database.Close();
			Redis.client.disconnect();
			process.exit(1);
		}
	}
}