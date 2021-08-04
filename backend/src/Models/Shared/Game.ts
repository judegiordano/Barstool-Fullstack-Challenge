// import { Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Column, JoinColumn, OneToOne } from "typeorm";

import { Base } from "../Base";
import { TeamInfo } from "./TeamInfo";
// import { OfficialInfo } from "./OfficialInfo";
import { EventInfo } from "./EventInfo";

// @Entity()
export abstract class GameInfo extends Base {

	constructor(game?: Partial<GameInfo>) {
		super();
		Object.assign(this, game);
	}

	@Column()
	league: string;

	// @OneToOne(() => TeamInfo, team => team.game)
	@OneToOne(() => TeamInfo)
	@JoinColumn()
	away_team: TeamInfo;

	// @OneToOne(() => TeamInfo, team => team.game)
	@OneToOne(() => TeamInfo)
	@JoinColumn()
	home_team: TeamInfo;

	// @OneToOne(() => EventInfo, event => event.game)
	@OneToOne(() => EventInfo)
	@JoinColumn()
	event_information: EventInfo;
}
