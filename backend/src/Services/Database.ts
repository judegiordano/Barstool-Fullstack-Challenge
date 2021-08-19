import path from "path";
import { cwd } from "process";
import { Connection, IDatabaseDriver, MikroORM, ConnectionOptions, EntityManager } from "@mikro-orm/core";

import { Config } from "./Config";

export class Database {

	private static orm: MikroORM<IDatabaseDriver<Connection>>;

	/**
	 *
	 * An extension of the `orm.em` property from mikroorm
	 * ____
	 * @static
	 * @type {EntityManager<IDatabaseDriver<Connection>>}
	 * @memberof Database
	 */
	public static Repo: EntityManager<IDatabaseDriver<Connection>>;

	private static readonly Connector: ConnectionOptions = {
		debug: !Config.Options.IS_PROD,
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
		},
	} as ConnectionOptions;

	public static async Connect(): Promise<void> {
		try {
			Database.orm = await MikroORM.init(Database.Connector);
			const { em } = Database.orm;
			Database.Repo = em;
			console.log("successfully connected to database", await Database.orm.isConnected());
		} catch (e) {
			throw new Error(`error connecting to database: ${e}`);
		}
	}

	public static async GetStatus(): Promise<boolean> {
		const connection = await Database.orm.isConnected();
		return connection;
	}

	public static async Close(): Promise<void> {
		try {
			return await Database.orm.close();
		} catch (e) {
			throw new Error(e);
		}
	}
}