import { AxiosRequestConfig } from "axios";
import { create, ApiResponse } from "apisauce";

import { Config } from "./Config";

export class Rest {

	private static readonly url = Config.Options.BACKEND_ENDPOINT;

	private static readonly client = create({
		baseURL: Rest.url,
		headers: {
			appcode: Config.Options.BACKEND_APPCODE,
			appsubscription: Config.Options.BACKEND_APPSUBSCRIPTION
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<any>> {
		try {
			return await Rest.client.get(url, config);
		} catch (error) {
			throw new Error(error);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<any>> {
		try {
			return await Rest.client.post(url, data, config);
		} catch (error) {
			throw new Error(error);
		}
	}
}