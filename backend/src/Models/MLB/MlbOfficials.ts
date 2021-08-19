import { Property, Entity, ManyToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbOfficial extends Base {

	constructor(official?: Partial<MlbOfficial>) {
		super();
		Object.assign(this, official);
	}

	@ManyToOne(() => MlbGameData, { hidden: true })
	game!: MlbGameData;

	@Property({ nullable: true })
	position: string;

	@Property()
	first_name: string;

	@Property()
	last_name: string;
}
