import { BeforeCreate, Dictionary, Entity, Index, Property, wrap } from "@mikro-orm/core";

import { Base } from "@Models/Base";
import { Password } from "@Services/Password";

@Entity()
export class Profile extends Base {

	@Index()
	@Property({ unique: true })
	username: string;

	@Property({ unique: true })
	email: string;

	@Property({ hidden: true })
	password: string;

	@Property({ default: 0 })
	token_version: number;

	@Property({ default: false, hidden: true })
	deleted: boolean;

	@Property({ default: false, hidden: true })
	is_verified: boolean;

	@BeforeCreate()
	public async HashPassword(): Promise<void> {
		this.password = await Password.Hash(this.password);
	}

	public toJSON(): Dictionary<Profile> {
		return wrap(this).toObject();
	}
}
