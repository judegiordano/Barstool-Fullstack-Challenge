import { Connection, createConnection, getConnection } from "typeorm";

export class Database {

	public static async Connect(): Promise<void> {

		let connection: Connection | undefined;
		try {
			connection = getConnection();
		} catch (e) {
			console.error(`no existing connection found: ${e}`);
		}

		try {
			if (connection) {
				if (!connection.isConnected)
					await connection.connect();
			} else
				await createConnection();
			console.log(" successfully connected to database");
		} catch (e) {
			throw new Error(`error connecting to database: ${e}`);
		}
	}

	public static GetStatus(): Connection {
		const connection = getConnection();
		return connection;
	}

	public static async Close(): Promise<void> {
		try {
			const conn = getConnection();
			await conn.close();
		} catch (e) {
			throw new Error(e);
		}
	}
}