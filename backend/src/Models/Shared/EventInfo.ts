import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { Base } from "../Base";
import { SiteInfo } from "./SiteInfo";

@Entity()
export class EventInfo extends Base {

	constructor(event?: Partial<EventInfo>) {
		super();
		Object.assign(this, event);
	}

	@OneToOne(() => SiteInfo, site => site.event, { eager: true })
	@JoinColumn()
	site: SiteInfo

	@Column()
	temperature: number;

	@Column()
	attendance: number;

	@Column()
	duration: string;

	@Column()
	status: string;

	@Column()
	season_type: string;

	@Column()
	start_date_time: Date;
}
