import { Entity, Property } from "@mikro-orm/core";

import { Base } from "../Base";

@Entity()
export class TeamInfo extends Base {

	constructor(team?: Partial<TeamInfo>) {
		super();
		Object.assign(this, team);
	}

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