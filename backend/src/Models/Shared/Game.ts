import { Column, JoinColumn, OneToOne } from "typeorm";

import { Base } from "../Base";
import { TeamInfo } from "./TeamInfo";
import { EventInfo } from "./EventInfo";

export abstract class GameInfo extends Base {

	constructor(game?: Partial<GameInfo>) {
		super();
		Object.assign(this, game);
	}

	@Column()
	league: string;

	@OneToOne(() => TeamInfo)
	@JoinColumn()
	away_team: TeamInfo;

	@OneToOne(() => TeamInfo)
	@JoinColumn()
	home_team: TeamInfo;

	@OneToOne(() => EventInfo)
	@JoinColumn()
	event_information: EventInfo;
}
