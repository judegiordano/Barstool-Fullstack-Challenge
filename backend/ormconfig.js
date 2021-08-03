// parse comile options
let isCompiled = false;
try {
	isCompiled = process.argv.filter(a => a.match(/.*IS_COMPILED.*/i))[0].split("=")[1] == "true" ? true : false;
} catch (error) {
	isCompiled = false;
}

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

module.exports = {
	type: DB_TYPE,
	host: DB_HOST,
	port: parseInt(DB_PORT),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: DB_SYNC,
	logging: DB_LOGGING,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	entities: [`./${isCompiled ? "build" : "src"}/Models/**/*.${isCompiled ? "js" : "ts"}`],
	migrations: [`./${isCompiled ? "build" : "src"}/Migrations/**/*.${isCompiled ? "js" : "ts"}`],
	ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
	cli: {
		entitiesDir: [`./${isCompiled ? "build" : "src"}/Models/**/*.${isCompiled ? "js" : "ts"}`],
		migrationsDir: [`./${isCompiled ? "build" : "src"}/Migrations/**/*.${isCompiled ? "js" : "ts"}`],
	},
	cache: true
};