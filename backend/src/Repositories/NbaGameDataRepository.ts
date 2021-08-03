import { NbaGameData } from "../Models/NbaGameData";
import { NbaTeamInfo } from "../Models/NbaTeamInfo";
import { NbaOfficials } from "../Models/NbaOfficials";
import { NbaEventInfo } from "../Models/NbaEventInfo";
import { NbaSiteInfo } from "../Models/NbaSiteInfo";

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

			// generic
			newGame.league = "NBA";
			newGame.away_team = newAwayTeam;
			newGame.home_team = newHomeTeam;
			newGame.officials = [newOfficial1, newOfficial2, newOfficial3];
			newGame.event_information = newEvent;
			newGame.away_period_scores = [3, 5, 6, 8];
			newGame.home_period_scores = [12, 78, 4, 2];

			await newAwayTeam.save();
			await newHomeTeam.save();
			await newOfficial1.save();
			await newOfficial2.save();
			await newOfficial3.save();
			await newSite.save();
			await newEvent.save();
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
					"event_information.site"
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