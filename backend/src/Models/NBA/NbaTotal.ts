import { Entity, Property } from "@mikro-orm/core";

import { Base } from "../Base";

@Entity()
export class NbaTotal extends Base {

	constructor(stat?: Partial<NbaTotal>) {
		super();
		Object.assign(this, stat);
	}

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
