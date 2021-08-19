import { Property, Entity, ManyToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbFielder extends Base {

	constructor(fielder?: Partial<MlbFielder>) {
		super();
		Object.assign(this, fielder);
	}

	@ManyToOne(() => MlbGameData, { hidden: true })
	game!: MlbGameData;

	@Property()
	last_name: string;

	@Property()
	first_name: string;

	@Property()
	display_name: string;

	@Property()
	errors: number;

	@Property()
	team_abbreviation: string;
}