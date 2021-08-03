import { createClient } from "redis";
import { promisify } from "util";

import { Config } from "@Services/Config";

export class Redis {

	public static readonly client = createClient(
		{
			host: Config.Redis.REDIS_HOST,
			password: Config.Redis.REDIS_PASSWORD,
			port: Config.Redis.REDIS_PORT
		}
	);
	private static _GetAsync = promisify(Redis.client.get).bind(Redis.client);
	private static _SetAsync = promisify(Redis.client.set).bind(Redis.client);
	private static _FlushAsync = promisify(Redis.client.flushall).bind(Redis.client);

	public static async FlushAsync(): Promise<unknown> {
		try {
			return Redis._FlushAsync();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetAsync(key: string): Promise<string | null> {
		try {
			return Redis._GetAsync(key);
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async SetAsync(key: string, value: string): Promise<unknown> {
		try {
			return Redis._SetAsync(key, value);
		} catch (error) {
			throw new Error(error);
		}
	}

}