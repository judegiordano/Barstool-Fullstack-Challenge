import { BeforeCreate, Index, PrimaryKey, Property } from "@mikro-orm/core";

import { Utility } from "@Services/Utility";

export abstract class Base {

	@PrimaryKey({ hidden: true })
	id?: number;

	@Index()
	@Property()
	uid: string;

	@Property({ hidden: true })
	createdAt?: Date = new Date();

	@Property({ onUpdate: () => new Date(), hidden: true })
	updatedAt?: Date = new Date();

	@BeforeCreate()
	public CreateUid(): void {
		this.uid = Utility.CreateUuid();
	}
}
