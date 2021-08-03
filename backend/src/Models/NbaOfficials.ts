import { Entity, Column, ManyToOne } from "typeorm";

import { Base } from "./Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaOfficials extends Base {

	constructor(official?: Partial<NbaOfficials>) {
		super();
		Object.assign(this, official);
	}

	@ManyToOne(() => NbaGameData, game => game.officials, { onDelete: "CASCADE" })
	game: NbaGameData;

	@Column({ nullable: true })
	position: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;
}
