import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { Base } from "./Base";
import { NbaGameData } from "./NbaGameData";
import { NbaSiteInfo } from "./NbaSiteInfo";

@Entity()
export class NbaEventInfo extends Base {

	constructor(event?: Partial<NbaEventInfo>) {
		super();
		Object.assign(this, event);
	}

	@OneToOne(() => NbaGameData, game => game.event_information, { onDelete: "CASCADE" })
	game: NbaGameData;

	@OneToOne(() => NbaSiteInfo, site => site.event)
	@JoinColumn()
	site: NbaSiteInfo

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
