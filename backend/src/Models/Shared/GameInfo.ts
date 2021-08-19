import { OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { EventInfo } from "./EventInfo";
import { TeamInfo } from "./TeamInfo";

export abstract class GameInfo extends Base {

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	away_team: TeamInfo;

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	home_team: TeamInfo;

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	event_information: EventInfo;
}
