import argon from "argon2";

export class Password {

	public static async Hash(password: string): Promise<string> {
		try {
			return await argon.hash(password);
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Compare(password: string, hash: string): Promise<boolean> {
		try {
			return await argon.verify(hash, password);
		} catch (error) {
			throw Error(error);
		}
	}
}
