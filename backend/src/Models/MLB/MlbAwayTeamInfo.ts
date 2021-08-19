import { Entity, OneToOne, Property } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbAwayTeamInfo extends Base {

	constructor(team?: Partial<MlbAwayTeamInfo>) {
		super();
		Object.assign(this, team);
	}

	@OneToOne(() => MlbGameData, game => game.away_team, { hidden: true })
	game!: MlbGameData;

	@Property()
	team_id: string;

	@Property()
	abbreviation: string;

	@Property()
	active: boolean;

	@Property()
	first_name: string;

	@Property()
	last_name: string;

	@Property()
	conference: string;

	@Property()
	division: string;

	@Property()
	site_name: string;

	@Property()
	city: string;

	@Property()
	state: string;

	@Property()
	full_name: string;
}