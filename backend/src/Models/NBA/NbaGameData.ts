import { Property, Entity, OneToOne, OneToMany, Collection, wrap, Dictionary } from "@mikro-orm/core";

import { Base } from "../Base";
import { NbaAwayTotals } from "./NbaAwayTotals";
import { NbaHomeStat } from "./NbaHomeStats";
import { NbaOfficial } from "./NbaOfficial";
import { NbaEventInfo } from "./NbaEventInfo";
import { NbaAwayTeamInfo } from "./NbaAwayTeamInfo";
import { NbaHomeTeamInfo } from "./NbaHomeTeamInfo";
import { NbaHomeTotals } from "./NbaHomeTotals";
import { NbaAwayStat } from "./NbaAwayStats";

@Entity()
export class NbaGameData extends Base {

	constructor(game?: Partial<NbaGameData>) {
		super();
		Object.assign(this, game);
	}

	@Property()
	league: string;

	@Property()
	away_period_scores: number[];

	@Property()
	home_period_scores: number[];

	@OneToOne(() => NbaAwayTeamInfo, team => team.game, { owner: true, eager: true, orphanRemoval: true })
	away_team: NbaAwayTeamInfo;

	@OneToOne(() => NbaHomeTeamInfo, team => team.game, { owner: true, eager: true, orphanRemoval: true })
	home_team: NbaHomeTeamInfo;

	@OneToOne(() => NbaEventInfo, event => event.game, { owner: true, eager: true, orphanRemoval: true })
	event_information: NbaEventInfo;

	@OneToMany(() => NbaOfficial, official => official.game, { eager: true, orphanRemoval: true })
	officials = new Collection<NbaOfficial>(this);

	@OneToMany(() => NbaAwayStat, stat => stat.game, { eager: true, orphanRemoval: true })
	away_stats = new Collection<NbaAwayStat>(this);

	@OneToMany(() => NbaHomeStat, stat => stat.game, { eager: true, orphanRemoval: true })
	home_stats = new Collection<NbaHomeStat>(this);

	@OneToOne(() => NbaAwayTotals, stat => stat.game, { owner: true, eager: true, orphanRemoval: true })
	away_totals: NbaAwayTotals;

	@OneToOne(() => NbaHomeTotals, stat => stat.game, { owner: true, eager: true, orphanRemoval: true })
	home_totals: NbaHomeTotals;

	toJSON(): Dictionary<NbaGameData> {
		return wrap(this).toObject();
	}
}
