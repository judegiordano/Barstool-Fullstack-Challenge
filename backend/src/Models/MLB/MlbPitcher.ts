import { Column, Entity, ManyToOne } from "typeorm";

import { Base } from "../Base";
import { MlbGameData } from "./MlbGameData";

@Entity()
export class MlbPitcher extends Base {

	constructor(pitcher?: Partial<MlbPitcher>) {
		super();
		Object.assign(this, pitcher);
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
	pitch_order: number;

	@Column()
	win: boolean;

	@Column()
	loss: boolean;

	// the property 'save' is taken in BaseEntity, which is super annoying
	@Column({ name: "save" })
	_save: boolean;

	@Column()
	hold: boolean;

	@Column({ type: "decimal" })
	era: number;

	@Column({ type: "decimal" })
	whip: number;

	@Column({ type: "decimal" })
	innings_pitched: number;

	@Column()
	hits_allowed: number;

	@Column()
	runs_allowed: number;

	@Column()
	earned_runs: number;

	@Column()
	walks: number;

	@Column()
	intentional_walks: number;

	@Column()
	strike_outs: number;

	@Column()
	home_runs_allowed: number;

	@Column()
	pitch_count: number;

	@Column()
	pitches_strikes: number;

	@Column()
	wild_pitches: number;

	@Column()
	hit_by_pitch: number;

	@Column()
	errors: number;

	@Column()
	team_abbreviation: string;
}