import { Entity, Property, OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";
import { MlbSiteInfo } from "./MlbSiteInfo";

@Entity()
export class MlbEventInfo extends Base {

	constructor(event?: Partial<MlbEventInfo>) {
		super();
		Object.assign(this, event);
	}

	@OneToOne(() => MlbGameData, game => game.event_information, { hidden: true })
	game!: MlbGameData;

	@OneToOne(() => MlbSiteInfo, site => site.event, { owner: true, eager: true, orphanRemoval: true })
	site: MlbSiteInfo;

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
