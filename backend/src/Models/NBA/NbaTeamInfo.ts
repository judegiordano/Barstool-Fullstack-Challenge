import { Entity, Column, OneToOne } from "typeorm";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaTeamInfo extends Base {

	constructor(team?: Partial<NbaTeamInfo>) {
		super();
		Object.assign(this, team);
	}

	@OneToOne(() => NbaGameData, { onDelete: "CASCADE" })
	game: NbaGameData

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
