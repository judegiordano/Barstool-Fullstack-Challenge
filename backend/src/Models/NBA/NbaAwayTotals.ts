import { Entity, Property, OneToOne } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaGameData } from "./NbaGameData";

@Entity()
export class NbaAwayTotals extends Base {

	constructor(stat?: Partial<NbaAwayTotals>) {
		super();
		Object.assign(this, stat);
	}

	@OneToOne(() => NbaGameData, game => game.away_totals, { hidden: true })
	game!: NbaGameData;

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
	field_goal_percentage: number;

	@Property()
	three_point_percentage: number;

	@Property()
	free_throw_percentage: number;
}
