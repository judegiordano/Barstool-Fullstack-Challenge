import { Entity, Property } from "@mikro-orm/core";

import { Base } from "../Base";

@Entity()
export class SiteInfo extends Base {

	constructor(site?: Partial<SiteInfo>) {
		super();
		Object.assign(this, site);
	}

	@Property()
	capacity: number;

	@Property()
	surface: string;

	@Property()
	name: string;

	@Property()
	state: string;

	@Property()
	city: string;
}
