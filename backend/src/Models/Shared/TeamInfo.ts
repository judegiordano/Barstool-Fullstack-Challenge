import { Entity, Column } from "typeorm";

import { Base } from "../Base";

@Entity()
export class TeamInfo extends Base {

	constructor(team?: Partial<TeamInfo>) {
		super();
		Object.assign(this, team);
	}

	@Column()
	team_id: string;

	@Column()
	abbreviation: string;

	@Column()
	active: boolean;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	conference: string;

	@Column()
	division: string;

	@Column()
	site_name: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	full_name: string;
}
