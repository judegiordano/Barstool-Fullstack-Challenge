import { NbaGameData } from "../Models/NbaGameData";
import { NbaTeamInfo } from "../Models/NbaTeamInfo";
import { NbaOfficials } from "../Models/NbaOfficials";
import { NbaEventInfo } from "../Models/NbaEventInfo";
import { NbaSiteInfo } from "../Models/NbaSiteInfo";
import { NbaStatInfo } from "../Models/NbaStatInfo";

export class NbaGameDataRepository {

	public static async SeedMockData(): Promise<NbaGameData> {
		try {
			const newGame = new NbaGameData();
			const newAwayTeam = new NbaTeamInfo();
			const newHomeTeam = new NbaTeamInfo();
			const newOfficial1 = new NbaOfficials();
			const newOfficial2 = new NbaOfficials();
			const newOfficial3 = new NbaOfficials();
			const newEvent = new NbaEventInfo();
			const newSite = new NbaSiteInfo();
			const newAwayTotals = new NbaStatInfo();
			const newHomeTotals = new NbaStatInfo();

			// away team
			newAwayTeam.team_id = "oklahoma-city-thunder";
			newAwayTeam.abbreviation = "OKC";
			newAwayTeam.active = true;
			newAwayTeam.first_name = "Oklahoma City";
			newAwayTeam.last_name = "Thunder";
			newAwayTeam.conference = "West";
			newAwayTeam.division = "Northwest";
			newAwayTeam.site_name = "Chesapeake Energy Arena";
			newAwayTeam.city = "Oklahoma City";
			newAwayTeam.state = "Oklahoma";
			newAwayTeam.full_name = "Oklahoma City Thunder";

			// home team
			newHomeTeam.team_id = "miami-heat";
			newHomeTeam.abbreviation = "MIA";
			newHomeTeam.active = true;
			newHomeTeam.first_name = "Miami";
			newHomeTeam.last_name = "Heat";
			newHomeTeam.conference = "East";
			newHomeTeam.division = "Southeast";
			newHomeTeam.site_name = "AmericanAirlines Arena";
			newHomeTeam.city = "Miami";
			newHomeTeam.state = "Florida";
			newHomeTeam.full_name = "Miami Heat";

			// officials
			newOfficial1.first_name = "Derrick";
			newOfficial1.last_name = "Stafford";
			newOfficial2.first_name = "Dan";
			newOfficial2.last_name = "Crawford";
			newOfficial3.first_name = "Monty";
			newOfficial3.last_name = "McCutchen";

			// site
			newSite.capacity = 19600;
			newSite.surface = "Hardwood";
			newSite.name = "AmericanAirlines Arena";
			newSite.state = "Florida";
			newSite.city = "Miami";

			// event
			newEvent.temperature = 0;
			newEvent.attendance = 20003;
			newEvent.duration = "2:40";
			newEvent.status = "completed";
			newEvent.season_type = "post";
			newEvent.start_date_time = new Date("2012-06-21T18:00:00-07:00");
			newEvent.site = newSite;

			// away totals
			newAwayTotals.minutes = 241;
			newAwayTotals.points = 106;
			newAwayTotals.assists = 19;
			newAwayTotals.turnovers = 13;
			newAwayTotals.steals = 7;
			newAwayTotals.blocks = 3;
			newAwayTotals.field_goals_attempted = 87;
			newAwayTotals.field_goals_made = 36;
			newAwayTotals.three_point_field_goals_attempted = 28;
			newAwayTotals.three_point_field_goals_made = 11;
			newAwayTotals.free_throws_attempted = 26;
			newAwayTotals.free_throws_made = 23;
			newAwayTotals.defensive_rebounds = 28;
			newAwayTotals.offensive_rebounds = 10;
			newAwayTotals.personal_fouls = 29;
			newAwayTotals.field_goal_percentage = 0.414;
			newAwayTotals.three_point_percentage = 0.393;
			newAwayTotals.free_throw_percentage = 0.885;

			//  home totals
			newHomeTotals.minutes = 241;
			newHomeTotals.points = 121;
			newHomeTotals.assists = 25;
			newHomeTotals.turnovers = 13;
			newHomeTotals.steals = 8;
			newHomeTotals.blocks = 7;
			newHomeTotals.field_goals_attempted = 77;
			newHomeTotals.field_goals_made = 40;
			newHomeTotals.three_point_field_goals_attempted = 26;
			newHomeTotals.three_point_field_goals_made = 14;
			newHomeTotals.free_throws_attempted = 33;
			newHomeTotals.free_throws_made = 27;
			newHomeTotals.defensive_rebounds = 33;
			newHomeTotals.offensive_rebounds = 8;
			newHomeTotals.personal_fouls = 21;
			newHomeTotals.field_goal_percentage = 0.519;
			newHomeTotals.three_point_percentage = 0.538;
			newHomeTotals.free_throw_percentage = 0.818;

			// generic
			newGame.league = "NBA";
			newGame.away_team = newAwayTeam;
			newGame.home_team = newHomeTeam;
			newGame.officials = [newOfficial1, newOfficial2, newOfficial3];
			newGame.event_information = newEvent;
			newGame.away_period_scores = [3, 5, 6, 8];
			newGame.home_period_scores = [12, 78, 4, 2];
			newGame.away_totals = newAwayTotals;
			newGame.home_totals = newHomeTotals;

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