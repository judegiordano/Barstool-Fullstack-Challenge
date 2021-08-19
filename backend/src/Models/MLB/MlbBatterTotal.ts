import { Property, Entity } from "@mikro-orm/core";

import { Base } from "../Base";

@Entity()
export class MlbBatterTotal extends Base {

	constructor(total?: Partial<MlbBatterTotal>) {
		super();
		Object.assign(this, total);
	}

	@Property()
	sacrifices: number;

	@Property()
	at_bats: number;

	@Property()
	plate_appearances: number;

	@Property()
	singles: number;

	@Property()
	doubles: number;

	@Property()
	triples: number;

	@Property()
	home_runs: number;

	@Property()
	sac_flies: number;

	@Property()
	sac_hits: number;

	@Property()
	stolen_bases: number;

	@Property()
	caught_stealing: number;

	@Property()
	rbi_with_two_outs: number;

	@Property()
	total_bases: number;

	@Property()
	runs: number;

	@Property()
	hits: number;

	@Property()
	rbi: number;

	@Property()
	walks: number;

	@Property()
	strike_outs: number;

	@Property()
	left_on_base: number;

	@Property()
	hit_by_pitch: number;

	@Property()
	ops: number;

	@Property()
	avg: number;

	@Property()
	obp: number;

	@Property()
	slg: number;

	@Property()
	at_bats_per_home_run: number;

	@Property()
	at_bats_per_rbi: number;

	@Property()
	walk_rate: number;

	@Property()
	plate_appearances_per_rbi: number;

	@Property()
	plate_appearances_per_home_run: number;

	@Property()
	extra_base_hits: number;

	@Property()
	stolen_base_average: number;

	@Property()
	strikeout_rate: number;

	@Property()
	ops_string: string;

	@Property()
	slg_string: string;

	@Property()
	obp_string: string;

	@Property()
	avg_string: string;

	@Property()
	batting_highlights: string;
}