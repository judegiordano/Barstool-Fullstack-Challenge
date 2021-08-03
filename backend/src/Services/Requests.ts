import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class Requests {

	private static readonly base = axios.create({
		baseURL: "https://chumley.barstoolsports.com/dev/data/games/"
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Get(url: string, config?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any>> {
		return await Requests.base.get(url, config);
	}

}