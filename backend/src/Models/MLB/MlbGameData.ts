import { Property, Entity, OneToOne, OneToMany, Collection, wrap, Dictionary } from "@mikro-orm/core";

import { MlbBatter } from "./MlbBatter";
import { MlbFielder } from "./MlbFielder";
import { MlbOfficial } from "./MlbOfficials";
import { MlbPitcher } from "./MlbPitcher";
import { MlbBatterTotal } from "./MlbBatterTotal";
import { GameInfo } from "../Shared/GameInfo";

@Entity()
export class MlbGameData extends GameInfo {

	constructor(game?: Partial<MlbGameData>) {
		super();
		Object.assign(this, game);
	}

	@Property()
	league: string;

	@Property()
	away_period_scores: number[];

	@Property()
	home_period_scores: number[];

	@Property()
	away_errors: number;

	@Property()
	home_errors: number;

	@OneToMany(() => MlbOfficial, official => official.game, { eager: true, orphanRemoval: true })
	officials = new Collection<MlbOfficial>(this);

	@OneToMany(() => MlbBatter, batter => batter.game, { mappedBy: "game", eager: true, orphanRemoval: true })
	away_batters = new Collection<MlbBatter>(this);

	@OneToMany(() => MlbBatter, batter => batter.game, { mappedBy: "game", eager: true, orphanRemoval: true })
	home_batters = new Collection<MlbBatter>(this);

	@OneToMany(() => MlbPitcher, pitcher => pitcher.game, { eager: true, orphanRemoval: true })
	away_pitchers = new Collection<MlbPitcher>(this);

	@OneToMany(() => MlbPitcher, pitcher => pitcher.game, { eager: true, orphanRemoval: true })
	home_pitchers = new Collection<MlbPitcher>(this);

	@OneToMany(() => MlbFielder, fielder => fielder.game, { eager: true, orphanRemoval: true })
	away_fielding = new Collection<MlbFielder>(this);

	@OneToMany(() => MlbFielder, fielder => fielder.game, { eager: true, orphanRemoval: true })
	home_fielding = new Collection<MlbFielder>(this);

	@OneToOne({ owner: true, orphanRemoval: true, eager: true })
	away_batter_totals: MlbBatterTotal;

	@OneToOne({ owner: true, orphanRemoval: true, eager: true })
	home_batter_totals: MlbBatterTotal;

	toJSON(): Dictionary<MlbGameData> {
		return wrap(this).toObject();
	}
}