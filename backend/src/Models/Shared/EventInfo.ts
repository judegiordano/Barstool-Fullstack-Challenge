import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { Base } from "../Base";
// import { GameInfo } from "./Game";
import { SiteInfo } from "./SiteInfo";

@Entity()
export class EventInfo extends Base {

	constructor(event?: Partial<EventInfo>) {
		super();
		Object.assign(this, event);
	}

	// @OneToOne(() => GameInfo, game => game.event_information, { onDelete: "CASCADE" })
	// game: GameInfo;

	@OneToOne(() => SiteInfo, site => site.event)
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
