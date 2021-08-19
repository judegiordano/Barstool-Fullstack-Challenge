import { Entity, Property, OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";
import { NbaSiteInfo } from "./NbaSiteInfo";

@Entity()
export class NbaEventInfo extends Base {

	constructor(event?: Partial<NbaEventInfo>) {
		super();
		Object.assign(this, event);
	}

	@OneToOne(() => NbaGameData, game => game.event_information, { hidden: true })
	game!: NbaGameData;

	@OneToOne(() => NbaSiteInfo, site => site.event, { owner: true, eager: true, orphanRemoval: true })
	site: NbaSiteInfo;

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
