import { Entity, Column, ManyToOne } from "typeorm";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaPlayerStat extends Base {

	constructor(player?: Partial<NbaPlayerStat>) {
		super();
		Object.assign(this, player);
	}

	@ManyToOne(() => NbaGameData, { onDelete: "CASCADE" })
	game: NbaGameData;

	@Column()
	last_name: string;

	@Column()
	first_name: string;

	@Column()
	display_name: string;

	@Column()
	position: string;

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

	@Column()
	team_abbreviation: string;

	@Column()
	is_starter: boolean;

	@Column({ type: "decimal" })
	field_goal_percentage: number;

	@Column({ type: "decimal" })
	three_point_percentage: number;

	@Column({ type: "decimal" })
	free_throw_percentage: number;
}
