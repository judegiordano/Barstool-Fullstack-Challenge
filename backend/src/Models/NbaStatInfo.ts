import { Entity, Column, OneToOne } from "typeorm";

import { Base } from "./Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaStatInfo extends Base {

	constructor(stat?: Partial<NbaStatInfo>) {
		super();
		Object.assign(this, stat);
	}

	@OneToOne(() => NbaGameData, { onDelete: "CASCADE" })
	game: NbaGameData

	@Column()
	minutes: number;

	@Column()
	points: number;

	@Column()
	assists: number;

	@Column()
	turnovers: number;

	@Column()
	steals: number;

	@Column()
	blocks: number;

	@Column()
	field_goals_attempted: number;

	@Column()
	field_goals_made: number;

	@Column()
	three_point_field_goals_attempted: number;

	@Column()
	three_point_field_goals_made: number;

	@Column()
	free_throws_attempted: number;

	@Column()
	free_throws_made: number;

	@Column()
	defensive_rebounds: number;

	@Column()
	offensive_rebounds: number;

	@Column()
	personal_fouls: number;

	@Column({ type: "decimal" })
	field_goal_percentage: number;

	@Column({ type: "decimal" })
	three_point_percentage: number;

	@Column({ type: "decimal" })
	free_throw_percentage: number;
}
