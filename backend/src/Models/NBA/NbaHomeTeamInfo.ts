import { Entity, OneToOne, Property } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaHomeTeamInfo extends Base {

	constructor(team?: Partial<NbaHomeTeamInfo>) {
		super();
		Object.assign(this, team);
	}

	@OneToOne(() => NbaGameData, game => game.home_team, { hidden: true })
	game?: NbaGameData;

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