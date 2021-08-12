import { Entity, Column, ManyToOne } from "typeorm";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbOfficial extends Base {

	constructor(official?: Partial<MlbOfficial>) {
		super();
		Object.assign(this, official);
	}

	@ManyToOne(() => MlbGameData, game => game.officials, { onDelete: "CASCADE" })
	game: MlbGameData;

	@Column({ nullable: true })
	position: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;
}
