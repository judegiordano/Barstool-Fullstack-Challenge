import { Property, ManyToOne, Entity } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbPitcher extends Base {

	constructor(pitcher?: Partial<MlbPitcher>) {
		super();
		Object.assign(this, pitcher);
	}

	@ManyToOne(() => MlbGameData, { hidden: true })
	game!: MlbGameData;

	@Property()
	last_name: string;

	@Property()
	first_name: string;

	@Property()
	display_name: string;

	@Property()
	pitch_order: number;

	@Property()
	win: boolean;

	@Property()
	loss: boolean;

	@Property()
	save: boolean;

	@Property()
	hold: boolean;

	@Property()
	era: number;

	@Property()
	whip: number;

	@Property()
	innings_pitched: number;

	@Property()
	hits_allowed: number;

	@Property()
	runs_allowed: number;

	@Property()
	earned_runs: number;

	@Property()
	walks: number;

	@Property()
	intentional_walks: number;

	@Property()
	strike_outs: number;

	@Property()
	home_runs_allowed: number;

	@Property()
	pitch_count: number;

	@Property()
	pitches_strikes: number;

	@Property()
	wild_pitches: number;

	@Property()
	hit_by_pitch: number;

	@Property()
	errors: number;

	@Property()
	team_abbreviation: string;
}