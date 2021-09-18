import argon from "argon2";

export class Password {

	public static async Hash(password: string): Promise<string> {
		return await argon.hash(password);

	}

	public static async Compare(password: string, hash: string): Promise<boolean> {
		return await argon.verify(hash, password);
	}
}
