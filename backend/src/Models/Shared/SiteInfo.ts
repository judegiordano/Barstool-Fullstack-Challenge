import { Entity, Column, OneToOne } from "typeorm";

import { Base } from "../Base";
import { EventInfo } from "./EventInfo";

@Entity()
export class SiteInfo extends Base {

	constructor(site?: Partial<SiteInfo>) {
		super();
		Object.assign(this, site);
	}

	@OneToOne(() => EventInfo, event => event.site, { onDelete: "CASCADE" })
	event: EventInfo

	@Column()
	capacity: number;

	@Column()
	surface: string;

	@Column()
	name: string;

	@Column()
	state: string;

	@Column()
	city: string;
}
