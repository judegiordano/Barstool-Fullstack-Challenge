import { Property, Entity, ManyToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaOfficial extends Base {

	constructor(official?: Partial<NbaOfficial>) {
		super();
		Object.assign(this, official);
	}

	@ManyToOne(() => NbaGameData, { hidden: true })
	game!: NbaGameData;

	@Property({ nullable: true })
	position: string;

	@Property()
	first_name: string;

	@Property()
	last_name: string;
}
