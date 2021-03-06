import _Redis from "ioredis";
import { promisify } from "util";

import { Config } from "@Services/Config";

export class Redis {

	public static readonly client = new _Redis(
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
		return Redis._FlushAsync();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async GetAsync(key: string): Promise<any | null> {
		return Redis._GetAsync(key);
	}

	public static async SetAsync(key: string, value: string): Promise<unknown> {
		return Redis._SetAsync(key, value);
	}

}