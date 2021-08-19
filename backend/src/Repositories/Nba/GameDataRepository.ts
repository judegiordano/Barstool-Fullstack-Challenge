import { INBAGameData } from "@barstool-dev/types";

import { Database } from "@Services/Database";
import { NbaGameData } from "@Models/NBA/NbaGameData";
import { NbaOfficial } from "@Models/NBA/NbaOfficial";
import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { NbaTotal } from "@Models/NBA/NbaTotal";
import { NbaStat } from "@Models/NBA/NbaStat";

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
			newGame.away_team = new TeamInfo(gameData.away_team);
			newGame.home_team = new TeamInfo(gameData.home_team);
			newGame.away_totals = new NbaTotal(gameData.away_totals);
			newGame.home_totals = new NbaTotal(gameData.home_totals);
			newGame.event_information = new EventInfo({
				...gameData.event_information,
				site: new SiteInfo(gameData.event_information.site)
			});

			Database.Repo.persist(newGame);

			for (const key of gameData.officials) {
				const official = new NbaOfficial(key);
				newGame.officials.add(official);
				Database.Repo.persist([official, newGame]);
			}
			for (const key of gameData.home_stats) {
				const stat = new NbaStat(key);
				newGame.home_stats.add(stat);
				Database.Repo.persist([stat, newGame]);
			}
			for (const key of gameData.away_stats) {
				const stat = new NbaStat(key);
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