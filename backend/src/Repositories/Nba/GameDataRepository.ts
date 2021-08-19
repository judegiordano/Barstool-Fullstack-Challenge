import { INBAGameData } from "@barstool-dev/types";

import { Database } from "@Services/Database";
import { NbaGameData } from "@Models/NBA/NbaGameData";
import { NbaOfficial } from "@Models/NBA/NbaOfficial";
import { NbaSiteInfo } from "@Models/NBA/NbaSiteInfo";
import { NbaAwayStat } from "@Models/NBA/NbaAwayStats";
import { NbaHomeStat } from "@Models/NBA/NbaHomeStats";
import { NbaEventInfo } from "@Models/NBA/NbaEventInfo";
import { NbaAwayTotals } from "@Models/NBA/NbaAwayTotals";
import { NbaHomeTotals } from "@Models/NBA/NbaHomeTotals";
import { NbaHomeTeamInfo } from "@Models/NBA/NbaHomeTeamInfo";
import { NbaAwayTeamInfo } from "@Models/NBA/NbaAwayTeamInfo";

export class GameDataRepository {

	public static async FindById(id: number): Promise<NbaGameData> {
		try {
			const game = await Database.Repo.findOne(NbaGameData, { id });
			if (!game) throw "game not found";
			return game;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async DeleteById(id: number): Promise<boolean> {
		try {
			const exists = await Database.Repo.findOne(NbaGameData, { id });
			if (!exists) throw "game not found";
			await Database.Repo.removeAndFlush(exists);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertGame(gameData: INBAGameData): Promise<NbaGameData> {
		try {
			const newGame = new NbaGameData();
			newGame.league = gameData.league;
			newGame.away_period_scores = gameData.away_period_scores;
			newGame.home_period_scores = gameData.home_period_scores;
			newGame.away_team = new NbaAwayTeamInfo(gameData.away_team);
			newGame.home_team = new NbaHomeTeamInfo(gameData.home_team);
			newGame.away_totals = new NbaAwayTotals(gameData.away_totals);
			newGame.home_totals = new NbaHomeTotals(gameData.home_totals);
			newGame.event_information = new NbaEventInfo({
				...gameData.event_information,
				site: new NbaSiteInfo(gameData.event_information.site)
			});

			Database.Repo.persist(newGame);

			for (const key of gameData.officials) {
				const official = new NbaOfficial(key);
				newGame.officials.add(official);
				Database.Repo.persist([official, newGame]);
			}
			for (const key of gameData.home_stats) {
				const stat = new NbaHomeStat(key);
				newGame.home_stats.add(stat);
				Database.Repo.persist([stat, newGame]);
			}
			for (const key of gameData.away_stats) {
				const stat = new NbaAwayStat(key);
				newGame.away_stats.add(stat);
				Database.Repo.persist([stat, newGame]);
			}

			await Database.Repo.flush();
			return newGame;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}
}