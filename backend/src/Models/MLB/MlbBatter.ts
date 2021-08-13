import { Column, Entity, ManyToOne } from "typeorm";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbBatter extends Base {

	constructor(batter?: Partial<MlbBatter>) {
		super();
		Object.assign(this, batter);
	}

	@ManyToOne(() => MlbGameData, { onDelete: "CASCADE" })
	game: MlbGameData

	@Column()
	last_name: string;

	@Column()
	first_name: string;

	@Column()
	display_name: string;

	@Column()
	position: string;

	@Column()
	bat_order: number;

	@Column()
	sub_bat_order: number;

	@Column()
	sacrifices: number;

	@Column()
	at_bats: number;

	@Column()
	plate_appearances: number;

	@Column()
	singles: number;

	@Column()
	doubles: number;

	@Column()
	triples: number;

	@Column()
	home_runs: number;

	@Column()
	sac_flies: number;

	@Column()
	sac_hits: number;

	@Column()
	stolen_bases: number;

	@Column()
	caught_stealing: number;

	@Column()
	rbi_with_two_outs: number;

	@Column()
	total_bases: number;

	@Column()
	runs: number;

	@Column()
	hits: number;

	@Column()
	rbi: number;

	@Column()
	walks: number;

	@Column()
	strike_outs: number;

	@Column()
	left_on_base: number;

	@Column()
	hit_by_pitch: number;

	@Column()
	team_abbreviation: string;

	@Column({ type: "decimal" })
	ops: number;

	@Column({ type: "decimal" })
	avg: number;

	@Column({ type: "decimal" })
	obp: number;

	@Column({ type: "decimal" })
	slg: number;

	@Column({ type: "decimal" })
	at_bats_per_home_run: number;

	@Column({ type: "decimal" })
	at_bats_per_rbi: number;

	@Column({ type: "decimal" })
	walk_rate: number;

	@Column({ type: "decimal" })
	plate_appearances_per_rbi: number;

	@Column({ type: "decimal" })
	plate_appearances_per_home_run: number;

	@Column()
	extra_base_hits: number;

	@Column({ type: "decimal" })
	stolen_base_average: number;

	@Column({ type: "decimal" })
	strikeout_rate: number;

	@Column()
	ops_string: string;

	@Column()
	slg_string: string;

	@Column()
	obp_string: string;

	@Column()
	avg_string: string;

	@Column()
	batting_highlights: string;
}