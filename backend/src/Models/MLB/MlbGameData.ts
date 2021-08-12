import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { GameInfo } from "../Shared/GameInfo";
import { MlbBatter } from "./MlbBatter";
import { MlbBatterTotal } from "./MlbBatterTotal";
import { MlbFielder } from "./MlbFielder";
import { MlbOfficial } from "./MlbOfficials";
import { MlbPitcher } from "./MlbPitcher";

@Entity()
export class MlbGameData extends GameInfo {

	constructor(game?: Partial<MlbGameData>) {
		super();
		Object.assign(this, game);
	}

	@Column()
	away_errors: number;

	@Column()
	home_errors: number;

	@OneToMany(() => MlbOfficial, official => official.game)
	@JoinColumn()
	officials: MlbOfficial[];

	@OneToMany(() => MlbBatter, batter => batter.game)
	@JoinColumn()
	away_batters: MlbBatter[];

	@OneToMany(() => MlbBatter, batter => batter.game)
	@JoinColumn()
	home_batters: MlbBatter[];

	@OneToMany(() => MlbPitcher, pitcher => pitcher.game)
	@JoinColumn()
	away_pitchers: MlbPitcher[];

	@OneToMany(() => MlbPitcher, pitcher => pitcher.game)
	@JoinColumn()
	home_pitchers: MlbPitcher[];

	@OneToMany(() => MlbFielder, fielder => fielder.game)
	@JoinColumn()
	away_fielding: MlbFielder[];

	@OneToMany(() => MlbFielder, fielder => fielder.game)
	@JoinColumn()
	home_fielding: MlbFielder[];

	@OneToOne(() => MlbBatterTotal, total => total.game)
	@JoinColumn()
	away_batter_totals: MlbBatterTotal;

	@OneToOne(() => MlbBatterTotal, total => total.game)
	@JoinColumn()
	home_batter_totals: MlbBatterTotal;
}