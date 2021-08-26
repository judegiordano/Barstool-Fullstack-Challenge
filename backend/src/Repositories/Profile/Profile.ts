import { EntityRepository } from "@mikro-orm/core";

import { Profile } from "@Models/Profile/Profile";

type RequestRepo = EntityRepository<Profile>;

export class ProfileRepository {

	public static async FindById(manager: RequestRepo, id: number): Promise<Profile> {
		try {
			const profile = await manager.findOne({ id }, { cache: 3000 });
			if (!profile) throw "profile not found";
			return profile;
		} catch (error) {
			throw new Error(error);
		}
	}
}