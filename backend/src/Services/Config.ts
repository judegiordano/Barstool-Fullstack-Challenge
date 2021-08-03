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

}