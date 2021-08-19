import { Property, Entity, OneToOne, OneToMany, Collection, wrap, Dictionary } from "@mikro-orm/core";

import { Base } from "../Base";
import { MlbBatter } from "./MlbBatter";
import { MlbHomeBatterTotal } from "./MlbHomeBatterTotal";
import { MlbFielder } from "./MlbFielder";
import { MlbOfficial } from "./MlbOfficials";
import { MlbPitcher } from "./MlbPitcher";
import { MlbAwayBatterTotal } from "./MlbAwayBatterTotal";
import { MlbAwayTeamInfo } from "./MlbAwayTeamInfo";
import { MlbHomeTeamInfo } from "./MlbHomeTeamInfo";
import { MlbEventInfo } from "./MlbEventInfo";

@Entity()
export class MlbGameData extends Base {

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

	@OneToOne(() => MlbEventInfo, event => event.game, { owner: true, eager: true, orphanRemoval: true })
	event_information: MlbEventInfo;

	@OneToOne(() => MlbAwayTeamInfo, team => team.game, { owner: true, eager: true, orphanRemoval: true })
	away_team: MlbAwayTeamInfo;

	@OneToOne(() => MlbHomeTeamInfo, team => team.game, { owner: true, eager: true, orphanRemoval: true })
	home_team: MlbHomeTeamInfo;

	@OneToMany(() => MlbOfficial, official => official.game, { eager: true, orphanRemoval: true })
	officials = new Collection<MlbOfficial>(this);

	@OneToMany(() => MlbBatter, batter => batter.game, { eager: true, orphanRemoval: true })
	away_batters = new Collection<MlbBatter>(this);

	@OneToMany(() => MlbBatter, batter => batter.game, { eager: true, orphanRemoval: true })
	home_batters = new Collection<MlbBatter>(this);

	@OneToMany(() => MlbPitcher, pitcher => pitcher.game, { eager: true, orphanRemoval: true })
	away_pitchers = new Collection<MlbPitcher>(this);

	@OneToMany(() => MlbPitcher, pitcher => pitcher.game, { eager: true, orphanRemoval: true })
	home_pitchers = new Collection<MlbPitcher>(this);

	@OneToMany(() => MlbFielder, fielder => fielder.game, { eager: true, orphanRemoval: true })
	away_fielding = new Collection<MlbFielder>(this);

	@OneToMany(() => MlbFielder, fielder => fielder.game, { eager: true, orphanRemoval: true })
	home_fielding = new Collection<MlbFielder>(this);

	@OneToOne(() => MlbAwayBatterTotal, batter => batter.game, { owner: true, orphanRemoval: true, eager: true })
	away_batter_totals: MlbAwayBatterTotal;

	@OneToOne(() => MlbHomeBatterTotal, batter => batter.game, { owner: true, orphanRemoval: true, eager: true })
	home_batter_totals: MlbHomeBatterTotal;

	toJSON(): Dictionary<MlbGameData> {
		return wrap(this).toObject();
	}
}