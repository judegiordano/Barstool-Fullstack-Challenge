import { Entity, JoinColumn, OneToOne, OneToMany } from "typeorm";

import { GameInfo } from "../Shared/GameInfo";
import { NbaStatInfo } from "./NbaStatInfo";
import { NbaPlayerStat } from "./NbaPlayerStat";
import { NbaOfficial } from "./NbaOfficial";

@Entity()
export class NbaGameData extends GameInfo {

	constructor(game?: Partial<NbaGameData>) {
		super();
		Object.assign(this, game);
	}

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
