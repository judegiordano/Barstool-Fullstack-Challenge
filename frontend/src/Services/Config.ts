export class Config {

	public static readonly Options = {
		NODE_ENV: process.env.NODE_ENV,
		HOST: process.env.HOST,
		IS_PROD: process.env.NODE_ENV == "production" ? true : false,
		BACKEND_APPCODE: process.env.BACKEND_APPCODE,
		BACKEND_APPSUBSCRIPTION: process.env.BACKEND_APPSUBSCRIPTION,
		BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
		BARSTOOL_ENDPOINT: process.env.BARSTOOL_ENDPOINT
	}
}