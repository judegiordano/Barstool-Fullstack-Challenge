export class Config {

	public static readonly Options = {
		HOST: process.env.HOST ?? "127.0.0.1",
		PORT: parseInt(process.env.PORT as string) || 3000,
		NODE_ENV: process.env.NODE_ENV ?? "development",
		APP_VERSION: process.env.APP_VERSION || "v1",
		IS_PROD: process.env.NODE_ENV == "production" ? true : false,
		APPCODE: process.env.APPCODE,
		DEV_SUBSCRIPTION: process.env.DEV_SUBSCRIPTION,
		CLIENT_SUBSCRIPTION: process.env.CLIENT_SUBSCRIPTION,
	}

	public static readonly Redis = {
		REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1",
		REDIS_PASSWORD: process.env.REDIS_PASSWORD,
		REDIS_PORT: parseInt(process.env.REDIS_PORT as string) ?? 6379
	}

	public static readonly Db = {
		DB_TYPE: process.env.DB_TYPE,
		DB_HOST: process.env.DB_HOST,
		DB_PORT: parseInt(process.env.DB_PORT as string),
		DB_USERNAME: process.env.DB_USERNAME,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_NAME: process.env.DB_NAME,
		DB_SYNC: process.env.DB_SYNC === "true" ? true : false,
		DB_LOGGING: process.env.DB_LOGGING === "true" ? true : false
	}

}