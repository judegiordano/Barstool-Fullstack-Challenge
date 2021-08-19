import { Entity, Property, OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { SiteInfo } from "./SiteInfo";

@Entity()
export class EventInfo extends Base {

	constructor(event?: Partial<EventInfo>) {
		super();
		Object.assign(this, event);
	}

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	site: SiteInfo;

	@Property()
	temperature: number;

	@Property()
	attendance: number;

	@Property()
	duration: string;

	@Property()
	status: string;

	@Property()
	season_type: string;

	@Property()
	start_date_time: Date;
}
