import { NbaGameData } from "../Models/NbaGameData";
import { NbaTeamInfo } from "../Models/NbaTeamInfo";
import { NbaOfficials } from "../Models/NbaOfficials";
import { NbaEventInfo } from "../Models/NbaEventInfo";
import { NbaSiteInfo } from "../Models/NbaSiteInfo";
import { NbaStatInfo } from "../Models/NbaStatInfo";

export class NbaGameDataRepository {

	public static async SeedMockData(): Promise<NbaGameData> {
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
			const newGame = new NbaGameData({
				league: "NBA",
				away_team: newAwayTeam,
				home_team: newHomeTeam,
				officials: [newOfficial1, newOfficial2, newOfficial3],
				event_information: newEvent,
				away_period_scores: [3, 5, 6, 8],
				home_period_scores: [12, 78, 4, 2],
				away_totals: newAwayTotals,
				home_totals: newHomeTotals
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

	public static async FindOneById(id: number): Promise<NbaGameData> {
		try {
			const exists = await NbaGameData.findOne({
				where: { id },
				relations: [
					"home_team",
					"away_team",
					"officials",
					"event_information",
					"event_information.site",
					"away_totals",
					"home_totals"
				],
				cache: true
			});
			if (!exists) throw "game not found";
			return exists;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async DeleteById(id: number): Promise<NbaGameData> {
		try {
			const exists = await NbaGameData.findOne({ id });
			if (!exists) throw "game not found";

			return await exists.remove();
		} catch (error) {
			throw new Error(error);
		}
	}
}