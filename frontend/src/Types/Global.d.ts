import {
	ITeamInfo,
	IPlayerStats,
	IOfficials,
	IEventInfo,
	IStatTotals
} from "./Abstract";

declare interface IStyles {
	[key: string]: React.CSSProperties
}

/**
 *
 * NBA Game Metadata
 * @interface INBAGameData
 */
declare interface INBAGameData {
	league: string,
	away_team: ITeamInfo,
	home_team: ITeamInfo,
	away_period_scores: number[],
	home_period_scores: number[],
	away_stats: IPlayerStats[],
	home_stats: IPlayerStats[],
	officials: IOfficials[],
	event_information: IEventInfo,
	away_totals: IStatTotals,
	home_totals: IStatTotals
}