import { IPlayerStats } from "@Types/Nba/Abstract";
import { NbaGameData } from "@Models/NBA/NbaGameData";
import { NbaTeamInfo } from "@Models/NBA/NbaTeamInfo";
import { NbaOfficials } from "@Models/NBA/NbaOfficials";
import { NbaEventInfo } from "@Models/NBA/NbaEventInfo";
import { NbaSiteInfo } from "@Models/NBA/NbaSiteInfo";
import { NbaStatInfo } from "@Models/NBA/NbaStatInfo";
import { NbaPlayerStat } from "@Models/NBA/NbaPlayerStat";

export class MockDataRepository {

	public static async MockNbaGame(): Promise<NbaGameData> {
		try {
			const newAwayTeam = new NbaTeamInfo({
				team_id: "oklahoma-city-thunder",
				abbreviation: "OKC",
				active: true,
				first_name: "Oklahoma City",
				last_name: "Thunder",
				conference: "West",
				division: "Northwest",
				site_name: "Chesapeake Energy Arena",
				city: "Oklahoma City",
				state: "Oklahoma",
				full_name: "Oklahoma City Thunder"
			});
			const newHomeTeam = new NbaTeamInfo({
				team_id: "miami-heat",
				abbreviation: "MIA",
				active: true,
				first_name: "Miami",
				last_name: "Heat",
				conference: "East",
				division: "Southeast",
				site_name: "AmericanAirlines Arena",
				city: "Miami",
				state: "Florida",
				full_name: "Miami Heat"
			});
			const newOfficial1 = new NbaOfficials({
				first_name: "Derrick",
				last_name: "Stafford"
			});
			const newOfficial2 = new NbaOfficials({
				first_name: "Dan",
				last_name: "Crawford"
			});
			const newOfficial3 = new NbaOfficials({
				first_name: "Monty",
				last_name: "McCutchen"
			});
			const newSite = new NbaSiteInfo({
				capacity: 19600,
				surface: "Hardwood",
				name: "AmericanAirlines Arena",
				state: "Florida",
				city: "Miami"
			});
			const newEvent = new NbaEventInfo({
				temperature: 0,
				attendance: 20003,
				duration: "2:40",
				status: "completed",
				season_type: "post",
				start_date_time: new Date("2012-06-21T18:00:00-07:00"),
				site: newSite
			});
			const newAwayTotals = new NbaStatInfo({
				minutes: 241,
				points: 106,
				assists: 19,
				turnovers: 13,
				steals: 7,
				blocks: 3,
				field_goals_attempted: 87,
				field_goals_made: 36,
				three_point_field_goals_attempted: 28,
				three_point_field_goals_made: 11,
				free_throws_attempted: 26,
				free_throws_made: 23,
				defensive_rebounds: 28,
				offensive_rebounds: 10,
				personal_fouls: 29,
				field_goal_percentage: 0.414,
				three_point_percentage: 0.393,
				free_throw_percentage: 0.885
			});
			const newHomeTotals = new NbaStatInfo({
				minutes: 241,
				points: 121,
				assists: 25,
				turnovers: 13,
				steals: 8,
				blocks: 7,
				field_goals_attempted: 77,
				field_goals_made: 40,
				three_point_field_goals_attempted: 26,
				three_point_field_goals_made: 14,
				free_throws_attempted: 33,
				free_throws_made: 27,
				defensive_rebounds: 33,
				offensive_rebounds: 8,
				personal_fouls: 21,
				field_goal_percentage: 0.519,
				three_point_percentage: 0.538,
				free_throw_percentage: 0.818
			});
			const newHomeStats = await MockDataRepository.InsertMultiplePlayerStats([{
				last_name: "James",
				first_name: "LeBron",
				display_name: "LeBron James",
				position: "SF",
				minutes: 44,
				points: 26,
				assists: 13,
				turnovers: 6,
				steals: 1,
				blocks: 2,
				field_goals_attempted: 19,
				field_goals_made: 9,
				three_point_field_goals_attempted: 3,
				three_point_field_goals_made: 0,
				free_throws_attempted: 9,
				free_throws_made: 8,
				defensive_rebounds: 7,
				offensive_rebounds: 4,
				personal_fouls: 2,
				team_abbreviation: "MIA",
				is_starter: true,
				field_goal_percentage: 0.474,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.889
			}, {
				last_name: "Wade",
				first_name: "Dwyane",
				display_name: "Dwyane Wade",
				position: "SG",
				minutes: 35,
				points: 20,
				assists: 3,
				turnovers: 1,
				steals: 2,
				blocks: 3,
				field_goals_attempted: 12,
				field_goals_made: 7,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 9,
				free_throws_made: 6,
				defensive_rebounds: 6,
				offensive_rebounds: 2,
				personal_fouls: 4,
				team_abbreviation: "MIA",
				is_starter: true,
				field_goal_percentage: 0.583,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.667
			}, {
				last_name: "Bosh",
				first_name: "Chris",
				display_name: "Chris Bosh",
				position: "PF",
				minutes: 34,
				points: 24,
				assists: 0,
				turnovers: 0,
				steals: 1,
				blocks: 2,
				field_goals_attempted: 14,
				field_goals_made: 9,
				three_point_field_goals_attempted: 1,
				three_point_field_goals_made: 1,
				free_throws_attempted: 5,
				free_throws_made: 5,
				defensive_rebounds: 7,
				offensive_rebounds: 0,
				personal_fouls: 1,
				team_abbreviation: "MIA",
				is_starter: true,
				field_goal_percentage: 0.643,
				three_point_percentage: 1.0,
				free_throw_percentage: 1.0
			}, {
				last_name: "Chalmers",
				first_name: "Mario",
				display_name: "Mario Chalmers",
				position: "PG",
				minutes: 34,
				points: 10,
				assists: 7,
				turnovers: 4,
				steals: 2,
				blocks: 0,
				field_goals_attempted: 6,
				field_goals_made: 3,
				three_point_field_goals_attempted: 4,
				three_point_field_goals_made: 2,
				free_throws_attempted: 2,
				free_throws_made: 2,
				defensive_rebounds: 1,
				offensive_rebounds: 1,
				personal_fouls: 3,
				team_abbreviation: "MIA",
				is_starter: true,
				field_goal_percentage: 0.5,
				three_point_percentage: 0.5,
				free_throw_percentage: 1.0
			}, {
				last_name: "Battier",
				first_name: "Shane",
				display_name: "Shane Battier",
				position: "SF",
				minutes: 29,
				points: 11,
				assists: 1,
				turnovers: 1,
				steals: 1,
				blocks: 0,
				field_goals_attempted: 8,
				field_goals_made: 4,
				three_point_field_goals_attempted: 7,
				three_point_field_goals_made: 3,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 4,
				offensive_rebounds: 0,
				personal_fouls: 4,
				team_abbreviation: "MIA",
				is_starter: true,
				field_goal_percentage: 0.5,
				three_point_percentage: 0.429,
				free_throw_percentage: 0.0
			}, {
				last_name: "Miller",
				first_name: "Mike",
				display_name: "Mike Miller",
				position: "SF",
				minutes: 23,
				points: 23,
				assists: 0,
				turnovers: 0,
				steals: 1,
				blocks: 0,
				field_goals_attempted: 11,
				field_goals_made: 7,
				three_point_field_goals_attempted: 8,
				three_point_field_goals_made: 7,
				free_throws_attempted: 2,
				free_throws_made: 2,
				defensive_rebounds: 5,
				offensive_rebounds: 0,
				personal_fouls: 4,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.636,
				three_point_percentage: 0.875,
				free_throw_percentage: 1.0
			}, {
				last_name: "Cole",
				first_name: "Norris",
				display_name: "Norris Cole",
				position: "PG",
				minutes: 17,
				points: 3,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 4,
				field_goals_made: 1,
				three_point_field_goals_attempted: 2,
				three_point_field_goals_made: 1,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 1,
				offensive_rebounds: 0,
				personal_fouls: 2,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.25,
				three_point_percentage: 0.5,
				free_throw_percentage: 0.0
			}, {
				last_name: "Haslem",
				first_name: "Udonis",
				display_name: "Udonis Haslem",
				position: "PF",
				minutes: 11,
				points: 1,
				assists: 1,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 1,
				field_goals_made: 0,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 2,
				free_throws_made: 1,
				defensive_rebounds: 0,
				offensive_rebounds: 1,
				personal_fouls: 1,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.5
			}, {
				last_name: "Jones",
				first_name: "James",
				display_name: "James Jones",
				position: "SF",
				minutes: 5,
				points: 0,
				assists: 0,
				turnovers: 1,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 1,
				field_goals_made: 0,
				three_point_field_goals_attempted: 1,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 0,
				offensive_rebounds: 0,
				personal_fouls: 0,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Howard",
				first_name: "Juwan",
				display_name: "Juwan Howard",
				position: "PF",
				minutes: 3,
				points: 0,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 1,
				field_goals_made: 0,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 0,
				offensive_rebounds: 0,
				personal_fouls: 0,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Turiaf",
				first_name: "Ronny",
				display_name: "Ronny Turiaf",
				position: "C",
				minutes: 3,
				points: 0,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 0,
				field_goals_made: 0,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 1,
				offensive_rebounds: 0,
				personal_fouls: 0,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Harris",
				first_name: "Terrel",
				display_name: "Terrel Harris",
				position: "SG",
				minutes: 3,
				points: 3,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 0,
				field_goals_made: 0,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 4,
				free_throws_made: 3,
				defensive_rebounds: 1,
				offensive_rebounds: 0,
				personal_fouls: 0,
				team_abbreviation: "MIA",
				is_starter: false,
				field_goal_percentage: 0.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.75
			}]);
			const newAwayStats = await MockDataRepository.InsertMultiplePlayerStats([{
				last_name: "Durant",
				first_name: "Kevin",
				display_name: "Kevin Durant",
				position: "SF",
				minutes: 43,
				points: 32,
				assists: 3,
				turnovers: 7,
				steals: 2,
				blocks: 1,
				field_goals_attempted: 24,
				field_goals_made: 13,
				three_point_field_goals_attempted: 6,
				three_point_field_goals_made: 3,
				free_throws_attempted: 3,
				free_throws_made: 3,
				defensive_rebounds: 9,
				offensive_rebounds: 2,
				personal_fouls: 5,
				team_abbreviation: "OKC",
				is_starter: true,
				field_goal_percentage: 0.542,
				three_point_percentage: 0.5,
				free_throw_percentage: 1.0
			}, {
				last_name: "Westbrook",
				first_name: "Russell",
				display_name: "Russell Westbrook",
				position: "PG",
				minutes: 43,
				points: 19,
				assists: 6,
				turnovers: 2,
				steals: 2,
				blocks: 0,
				field_goals_attempted: 20,
				field_goals_made: 4,
				three_point_field_goals_attempted: 5,
				three_point_field_goals_made: 0,
				free_throws_attempted: 13,
				free_throws_made: 11,
				defensive_rebounds: 4,
				offensive_rebounds: 0,
				personal_fouls: 3,
				team_abbreviation: "OKC",
				is_starter: true,
				field_goal_percentage: 0.2,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.846
			}, {
				last_name: "Ibaka",
				first_name: "Serge",
				display_name: "Serge Ibaka",
				position: "PF",
				minutes: 26,
				points: 9,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 2,
				field_goals_attempted: 9,
				field_goals_made: 3,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 4,
				free_throws_made: 3,
				defensive_rebounds: 0,
				offensive_rebounds: 4,
				personal_fouls: 3,
				team_abbreviation: "OKC",
				is_starter: true,
				field_goal_percentage: 0.333,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.75
			}, {
				last_name: "Perkins",
				first_name: "Kendrick",
				display_name: "Kendrick Perkins",
				position: "C",
				minutes: 20,
				points: 2,
				assists: 0,
				turnovers: 1,
				steals: 1,
				blocks: 0,
				field_goals_attempted: 4,
				field_goals_made: 1,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 4,
				offensive_rebounds: 0,
				personal_fouls: 5,
				team_abbreviation: "OKC",
				is_starter: true,
				field_goal_percentage: 0.25,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Sefolosha",
				first_name: "Thabo",
				display_name: "Thabo Sefolosha",
				position: "SF",
				minutes: 9,
				points: 0,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 2,
				field_goals_made: 0,
				three_point_field_goals_attempted: 1,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 0,
				offensive_rebounds: 0,
				personal_fouls: 2,
				team_abbreviation: "OKC",
				is_starter: true,
				field_goal_percentage: 0.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Harden",
				first_name: "James",
				display_name: "James Harden",
				position: "SG",
				minutes: 36,
				points: 19,
				assists: 5,
				turnovers: 3,
				steals: 2,
				blocks: 0,
				field_goals_attempted: 11,
				field_goals_made: 5,
				three_point_field_goals_attempted: 8,
				three_point_field_goals_made: 3,
				free_throws_attempted: 6,
				free_throws_made: 6,
				defensive_rebounds: 3,
				offensive_rebounds: 1,
				personal_fouls: 2,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 0.455,
				three_point_percentage: 0.375,
				free_throw_percentage: 1.0
			}, {
				last_name: "Fisher",
				first_name: "Derek",
				display_name: "Derek Fisher",
				position: "PG",
				minutes: 29,
				points: 11,
				assists: 3,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 7,
				field_goals_made: 4,
				three_point_field_goals_attempted: 6,
				three_point_field_goals_made: 3,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 3,
				offensive_rebounds: 1,
				personal_fouls: 4,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 0.571,
				three_point_percentage: 0.5,
				free_throw_percentage: 0.0
			}, {
				last_name: "Collison",
				first_name: "Nick",
				display_name: "Nick Collison",
				position: "PF",
				minutes: 17,
				points: 2,
				assists: 1,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 3,
				field_goals_made: 1,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 2,
				offensive_rebounds: 2,
				personal_fouls: 3,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 0.333,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Cook",
				first_name: "Daequan",
				display_name: "Daequan Cook",
				position: "SG",
				minutes: 5,
				points: 2,
				assists: 1,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 2,
				field_goals_made: 1,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 0,
				offensive_rebounds: 0,
				personal_fouls: 1,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 0.5,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Aldrich",
				first_name: "Cole",
				display_name: "Cole Aldrich",
				position: "C",
				minutes: 5,
				points: 2,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 1,
				field_goals_made: 1,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 1,
				offensive_rebounds: 0,
				personal_fouls: 0,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 1.0,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Hayward",
				first_name: "Lazar",
				display_name: "Lazar Hayward",
				position: "SF",
				minutes: 5,
				points: 2,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 2,
				field_goals_made: 1,
				three_point_field_goals_attempted: 0,
				three_point_field_goals_made: 0,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 2,
				offensive_rebounds: 0,
				personal_fouls: 1,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 0.5,
				three_point_percentage: 0.0,
				free_throw_percentage: 0.0
			}, {
				last_name: "Ivey",
				first_name: "Royal",
				display_name: "Royal Ivey",
				position: "PG",
				minutes: 3,
				points: 6,
				assists: 0,
				turnovers: 0,
				steals: 0,
				blocks: 0,
				field_goals_attempted: 2,
				field_goals_made: 2,
				three_point_field_goals_attempted: 2,
				three_point_field_goals_made: 2,
				free_throws_attempted: 0,
				free_throws_made: 0,
				defensive_rebounds: 0,
				offensive_rebounds: 0,
				personal_fouls: 0,
				team_abbreviation: "OKC",
				is_starter: false,
				field_goal_percentage: 1.0,
				three_point_percentage: 1.0,
				free_throw_percentage: 0.0
			}]);
			// game
			const newGame = new NbaGameData({
				league: "NBA",
				away_team: newAwayTeam,
				home_team: newHomeTeam,
				officials: [newOfficial1, newOfficial2, newOfficial3],
				event_information: newEvent,
				away_period_scores: [3, 5, 6, 8],
				home_period_scores: [12, 78, 4, 2],
				away_totals: newAwayTotals,
				home_totals: newHomeTotals,
				home_stats: newHomeStats,
				away_stats: newAwayStats
			});

			await newAwayTeam.save();
			await newHomeTeam.save();
			await newOfficial1.save();
			await newOfficial2.save();
			await newOfficial3.save();
			await newSite.save();
			await newEvent.save();
			await newAwayTotals.save();
			await newHomeTotals.save();
			// insert game
			return await newGame.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertMultiplePlayerStats(playerStats: IPlayerStats[]): Promise<NbaPlayerStat[]> {
		try {
			const players = [];
			for (const key in playerStats) {
				const newStat = new NbaPlayerStat({ ...playerStats[key] as IPlayerStats });
				await newStat.save();
				players.push(newStat);
			}
			return players;
		} catch (error) {
			throw new Error(error);
		}
	}
}