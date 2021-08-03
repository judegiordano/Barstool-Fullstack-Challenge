import { Entity, Column, OneToOne } from "typeorm";

import { Base } from "./Base";
import { NbaEventInfo } from "./NbaEventInfo";

@Entity()
export class NbaSiteInfo extends Base {

	@OneToOne(() => NbaEventInfo, event => event.site, { onDelete: "CASCADE" })
	event: NbaEventInfo

	@Column()
	capacity: number;

	@Column()
	surface: string;

	@Column()
	name: string;

	@Column()
	state: string;

	@Column()
	city: string;
}
