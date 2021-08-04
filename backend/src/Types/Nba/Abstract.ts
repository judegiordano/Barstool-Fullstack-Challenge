import { IGame } from "../Shared";

export interface IPlayerStats {
	last_name: string,
	first_name: string,
	display_name: string,
	position: string,
	minutes: number,
	points: number,
	assists: number,
	turnovers: number,
	steals: number,
	blocks: number,
	field_goals_attempted: number,
	field_goals_made: number,
	three_point_field_goals_attempted: number,
	three_point_field_goals_made: number,
	free_throws_attempted: number,
	free_throws_made: number,
	defensive_rebounds: number,
	offensive_rebounds: number,
	personal_fouls: number,
	team_abbreviation: string,
	is_starter: boolean,
	field_goal_percentage: number,
	three_point_percentage: number,
	free_throw_percentage: number
}

export interface IStatTotals {
	minutes: number,
	points: number,
	assists: number,
	turnovers: number,
	steals: number,
	blocks: number,
	field_goals_attempted: number,
	field_goals_made: number,
	three_point_field_goals_attempted: number,
	three_point_field_goals_made: number,
	free_throws_attempted: number,
	free_throws_made: number,
	defensive_rebounds: number,
	offensive_rebounds: number,
	personal_fouls: number,
	field_goal_percentage: number,
	three_point_percentage: number,
	free_throw_percentage: number
}

/**
 *
 * NBA Game Metadata
 * @interface INBAGameData
 */
export interface INBAGameData extends IGame {
	away_period_scores: number[],
	home_period_scores: number[],
	away_stats: IPlayerStats[],
	home_stats: IPlayerStats[],
	away_totals: IStatTotals,
	home_totals: IStatTotals
}