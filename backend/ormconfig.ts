const NODE_ENV = process.env.NODE_ENV;
const {
	DB_TYPE,
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME } = process.env;

const DB_SYNC = process.env.DB_SYNC == "true" ? true : false;
const DB_LOGGING = process.env.DB_LOGGING == "true" ? true : false;

export default {
	type: DB_TYPE,
	host: DB_HOST,
	port: parseInt(DB_PORT as string),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: DB_SYNC,
	logging: DB_LOGGING,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	entities: ["./src/Models/**/*.ts"],
	migrations: ["./src/Migrations/**/*.ts"],
	ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
	cli: {
		entitiesDir: ["./src/Models/**/*.ts"],
		migrationsDir: ["./src/Migrations/**/*.ts"],
	},
	cache: true
};