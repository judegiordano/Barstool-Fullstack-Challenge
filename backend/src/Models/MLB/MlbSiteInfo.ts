import { Entity, Property, OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbEventInfo } from "./MlbEventInfo";

@Entity()
export class MlbSiteInfo extends Base {

	constructor(site?: Partial<MlbSiteInfo>) {
		super();
		Object.assign(this, site);
	}

	@OneToOne(() => MlbEventInfo, event => event.site, { hidden: true })
	event!: MlbEventInfo;

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
