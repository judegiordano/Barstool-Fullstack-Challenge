export interface ITeamInfo {
	team_id: string,
	abbreviation: string,
	active: boolean,
	first_name: string,
	last_name: string,
	conference: string,
	division: string,
	site_name: string,
	city: string,
	state: string,
	full_name: string
}

export interface ISite {
	capacity: number,
	surface: string,
	name: string,
	state: string,
	city: string
}

export interface IEvent {
	temperature: number,
	site: ISite,
	attendance: number,
	duration: string,
	status: string,
	season_type: string,
	start_date_time: Date
}

export interface IOffical {
	position: string,
	first_name: string,
	last_name: string
}

/**
 *
 * @export
 * @interface IGame
 * ---
 * Generic IGame object
 */
export interface IGame {
	away_team: ITeamInfo,
	home_team: ITeamInfo,
	league: string,
	event_information: IEvent,
	officials: IOffical[]
}