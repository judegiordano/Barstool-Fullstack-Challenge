import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";

import { Base } from "./Base";
import { NbaTeamInfo } from "./NbaTeamInfo";
import { NbaOfficials } from "./NbaOfficials";
import { NbaEventInfo } from "./NbaEventInfo";

@Entity()
export class NbaGameData extends Base {

	@Column()
	league: string;

	@OneToOne(() => NbaTeamInfo, team => team.game)
	@JoinColumn()
	away_team: NbaTeamInfo;

	@OneToOne(() => NbaTeamInfo, team => team.game)
	@JoinColumn()
	home_team: NbaTeamInfo;

	@Column("int", { array: true })
	away_period_scores: number[];

	@Column("int", { array: true })
	home_period_scores: number[];

	// @Column()
	// away_stats: IPlayerStats[];

	// @Column()
	// home_stats: IPlayerStats[];

	@OneToMany(() => NbaOfficials, official => official.game)
	@JoinColumn()
	officials: NbaOfficials[];

	@OneToOne(() => NbaEventInfo, event => event.game)
	@JoinColumn()
	event_information: NbaEventInfo;

	// @Column()
	// away_totals: IStatTotals;

	// @Column()
	// home_totals: IStatTotals;
}
