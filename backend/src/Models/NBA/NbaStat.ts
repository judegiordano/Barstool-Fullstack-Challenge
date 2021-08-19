import { Property, Entity, ManyToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaStat extends Base {

	constructor(player?: Partial<NbaStat>) {
		super();
		Object.assign(this, player);
	}

	@ManyToOne(() => NbaGameData, { hidden: true })
	game!: NbaGameData;

	@Property()
	last_name: string;

	@Property()
	first_name: string;

	@Property()
	display_name: string;

	@Property()
	position: string;

	@Property()
	minutes: number;

	@Property()
	points: number;

	@Property()
	assists: number;

	@Property()
	turnovers: number;

	@Property()
	steals: number;

	@Property()
	blocks: number;

	@Property()
	field_goals_attempted: number;

	@Property()
	field_goals_made: number;

	@Property()
	three_point_field_goals_attempted: number;

	@Property()
	three_point_field_goals_made: number;

	@Property()
	free_throws_attempted: number;

	@Property()
	free_throws_made: number;

	@Property()
	defensive_rebounds: number;

	@Property()
	offensive_rebounds: number;

	@Property()
	personal_fouls: number;

	@Property()
	team_abbreviation: string;

	@Property()
	is_starter: boolean;

	@Property()
	field_goal_percentage: number;

	@Property()
	three_point_percentage: number;

	@Property()
	free_throw_percentage: number;
}
