import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";

import { GameInfo } from "../Shared/Game";
import { NbaStatInfo } from "./NbaStatInfo";
import { NbaPlayerStat } from "./NbaPlayerStat";
import { NbaOfficial } from "./NbaOfficial";

@Entity()
export class NbaGameData extends GameInfo {

	constructor(game?: Partial<NbaGameData>) {
		super();
		Object.assign(this, game);
	}

	@Column("int", { array: true })
	away_period_scores: number[];

	@Column("int", { array: true })
	home_period_scores: number[];

	@OneToMany(() => NbaPlayerStat, stat => stat.game)
	@JoinColumn()
	away_stats: NbaPlayerStat[];

	@OneToMany(() => NbaOfficial, official => official.game)
	@JoinColumn()
	officials: NbaOfficial[];

	@OneToMany(() => NbaPlayerStat, stat => stat.game)
	@JoinColumn()
	home_stats: NbaPlayerStat[];

	@OneToOne(() => NbaStatInfo, stat => stat.game)
	@JoinColumn()
	away_totals: NbaStatInfo;

	@OneToOne(() => NbaStatInfo, stat => stat.game)
	@JoinColumn()
	home_totals: NbaStatInfo;
}
