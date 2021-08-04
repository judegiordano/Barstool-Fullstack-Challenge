// // import { Entity, Column, ManyToOne } from "typeorm";
// import { Entity, Column } from "typeorm";

// import { Base } from "../Base";
// // import { GameInfo } from "./Game";

// @Entity()
// export class OfficialInfo extends Base {

// 	constructor(official?: Partial<OfficialInfo>) {
// 		super();
// 		Object.assign(this, official);
// 	}

// 	// @ManyToOne(() => GameInfo, game => game.officials, { onDelete: "CASCADE" })
// 	// @ManyToOne(() => GameInfo)
// 	// game: GameInfo;

// 	@Column({ nullable: true })
// 	position: string;

// 	@Column()
// 	first_name: string;

// 	@Column()
// 	last_name: string;
// }
