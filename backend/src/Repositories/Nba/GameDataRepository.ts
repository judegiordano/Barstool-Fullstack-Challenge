import { IPlayerStats, IOffical, INBAGameData } from "@barstool-dev/types";

import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { NbaOfficial } from "@Models/NBA/NbaOfficial";
import { NbaGameData } from "@Models/NBA/NbaGameData";
import { NbaStatInfo } from "@Models/NBA/NbaStatInfo";
import { NbaPlayerStat } from "@Models/NBA/NbaPlayerStat";

export class GameDataRepository {

	public static async FindById(id: number): Promise<Partial<NbaGameData>> {
		try {
			const exists = await NbaGameData.findOne({ where: { id }, cache: 15000 });
			if (!exists) throw "game not found";

			const { officials } = await NbaGameData.findOne({ where: { id }, relations: ["officials"] }) as NbaGameData;
			const { away_totals } = await NbaGameData.findOne({ where: { id }, relations: ["away_totals"] }) as NbaGameData;
			const { home_totals } = await NbaGameData.findOne({ where: { id }, relations: ["home_totals"] }) as NbaGameData;
			const { home_stats } = await NbaGameData.findOne({ where: { id }, relations: ["home_stats"] }) as NbaGameData;
			const { away_stats } = await NbaGameData.findOne({ where: { id }, relations: ["away_stats"] }) as NbaGameData;

			return {
				...exists,
				officials,
				away_totals,
				home_totals,
				home_stats,
				away_stats
			};
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
				away_period_scores: gameData.away_period_scores,
				home_period_scores: gameData.home_period_scores,
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
			for (const key of playerStats) {
				const newInstance = new NbaPlayerStat(key);
				await newInstance.save();
				players.push(newInstance);
			}
			return players;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertMultipleOfficials(officials: IOffical[]): Promise<NbaOfficial[]> {
		try {
			const newOfficials = [];
			for (const key of officials) {
				const newInstance = new NbaOfficial(key);
				await newInstance.save();
				newOfficials.push(newInstance);
			}
			return newOfficials;
		} catch (error) {
			throw new Error(error);
		}
	}
}