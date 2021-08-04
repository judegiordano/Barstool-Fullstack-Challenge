import { INBAGameData } from "@Types/Nba/Abstract";
import { IOffical } from "@Types/Shared";
import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { IPlayerStats } from "@Types/Nba/Abstract";
import { NbaOfficial } from "@Models/NBA/NbaOfficial";
import { NbaGameData } from "@Models/NBA/NbaGameData";
import { NbaStatInfo } from "@Models/NBA/NbaStatInfo";
import { NbaPlayerStat } from "@Models/NBA/NbaPlayerStat";

export class GameDataRepository {

	public static async FindById(id: number): Promise<NbaGameData> {
		try {
			const exists = await NbaGameData.findOne({
				where: { id },
				relations: [
					"away_team",
					"home_team",
					"officials",
					"event_information",
					"event_information.site",
					"away_totals",
					"home_totals",
					"home_stats",
					"away_stats"
				],
				cache: 15000
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

	public static async InsertGame(gameData: INBAGameData): Promise<NbaGameData> {
		try {
			const newAwayTeam = new TeamInfo({ ...gameData.away_team });
			const newHomeTeam = new TeamInfo({ ...gameData.home_team });
			const newOfficials = await GameDataRepository.InsertMultipleOfficials(gameData.officials);
			const newSite = new SiteInfo({ ...gameData.event_information.site });
			const newEvent = new EventInfo({ ...gameData.event_information, site: newSite });
			const newAwayTotals = new NbaStatInfo({ ...gameData.away_totals });
			const newHomeTotals = new NbaStatInfo({ ...gameData.home_totals });
			const newHomeStats = await GameDataRepository.InsertMultiplePlayerStats(gameData.home_stats);
			const newAwayStats = await GameDataRepository.InsertMultiplePlayerStats(gameData.away_stats);
			// game
			const newGame = new NbaGameData({
				league: gameData.league,
				away_team: newAwayTeam,
				home_team: newHomeTeam,
				officials: newOfficials,
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

	public static async InsertMultipleOfficials(officials: IOffical[]): Promise<NbaOfficial[]> {
		try {
			const newOfficials = [];
			for (const key in officials) {
				const newOfficial = new NbaOfficial({ ...officials[key] as IOffical });
				await newOfficial.save();
				newOfficials.push(newOfficial);
			}
			return newOfficials;
		} catch (error) {
			throw new Error(error);
		}
	}
}