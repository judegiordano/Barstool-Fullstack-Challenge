import path from "path";
import { cwd } from "process";
import { Connection, IDatabaseDriver, MikroORM, ConnectionOptions, EntityManager } from "@mikro-orm/core";

import { Config } from "./Config";
import { Log } from "./Logger";

export class Database {

	public static orm: MikroORM<IDatabaseDriver<Connection>>;

	/**
	 *
	 * An extension of the `orm.em` property from mikroorm
	 * ____
	 * @static
	 * @type {EntityManager<IDatabaseDriver<Connection>>}
	 * @memberof Database
	 */
	public static Manager: EntityManager<IDatabaseDriver<Connection>>;

	private static readonly Connector: ConnectionOptions = {
		debug: !Config.Options.IS_PROD,
		logger: (msg: unknown) => Log.Info(msg, "database"),
		type: Config.Db.DB_TYPE,
		host: Config.Db.DB_HOST,
		port: Config.Db.DB_PORT,
		user: Config.Db.DB_USERNAME,
		password: Config.Db.DB_PASSWORD,
		dbName: Config.Db.DB_NAME,
		entities: [path.join(cwd(), "build/Models/**/*.js")],
		entitiesTs: [path.join(cwd(), "src/Models/**/*.ts")],
		cache: {
			enabled: true,
			pretty: !Config.Options.IS_PROD,
			options: { cacheDir: cwd() + "/__db_cache__" }
		}
	} as ConnectionOptions;

	public static async Connect(): Promise<void> {
		try {
			Database.orm = await MikroORM.init(Database.Connector);
			Database.Manager = Database.orm.em.fork();
			Log.Info(`successfully connected to database: ${await Database.orm.isConnected()}`, "database");
		} catch (e) {
			throw new Error(`error connecting to database: ${e}`);
		}
	}

	public static async GetStatus(): Promise<boolean> {
		try {
			const connection = await Database.orm.isConnected();
			return connection;
		} catch (e) {
			throw new Error(e);
		}
	}

	public static async Close(): Promise<void> {
		try {
			return await Database.orm.close();
		} catch (e) {
			throw new Error(e);
		}
	}
}