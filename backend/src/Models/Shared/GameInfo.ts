import { Column, JoinColumn, OneToOne } from "typeorm";

import { Base } from "../Base";
import { TeamInfo } from "./TeamInfo";
import { EventInfo } from "./EventInfo";

export abstract class GameInfo extends Base {

	@Column("int", { array: true })
	away_period_scores: number[];

	@Column("int", { array: true })
	home_period_scores: number[];

	@Column()
	league: string;

	@OneToOne(() => TeamInfo, { eager: true })
	@JoinColumn()
	away_team: TeamInfo;

	@OneToOne(() => TeamInfo, { eager: true })
	@JoinColumn()
	home_team: TeamInfo;

	@OneToOne(() => EventInfo, { eager: true })
	@JoinColumn()
	event_information: EventInfo;
}
