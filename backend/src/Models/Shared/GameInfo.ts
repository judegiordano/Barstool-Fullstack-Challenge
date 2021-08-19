import { OneToOne, Property } from "@mikro-orm/core";

import { Base } from "../Base";
import { EventInfo } from "./EventInfo";
import { TeamInfo } from "./TeamInfo";

export abstract class GameInfo extends Base {

	@Property()
	league: string;

	@Property()
	away_period_scores: number[];

	@Property()
	home_period_scores: number[];

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	away_team: TeamInfo;

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	home_team: TeamInfo;

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	event_information: EventInfo;
}
