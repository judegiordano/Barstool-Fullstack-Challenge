import { Column, Entity, ManyToOne } from "typeorm";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbFielder extends Base {

	constructor(fielder?: Partial<MlbFielder>) {
		super();
		Object.assign(this, fielder);
	}

	@ManyToOne(() => MlbGameData, { onDelete: "CASCADE" })
	game: MlbGameData

	@Column()
	last_name: string;

	@Column()
	first_name: string;

	@Column()
	display_name: string;

	@Column()
	errors: number;

	@Column()
	team_abbreviation: string;
}