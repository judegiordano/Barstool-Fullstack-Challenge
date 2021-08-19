import { Entity, Property, OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaEventInfo } from "./NbaEventInfo";

@Entity()
export class NbaSiteInfo extends Base {

	constructor(site?: Partial<NbaSiteInfo>) {
		super();
		Object.assign(this, site);
	}

	@OneToOne(() => NbaEventInfo, event => event.site, { hidden: true })
	event!: NbaEventInfo;

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
