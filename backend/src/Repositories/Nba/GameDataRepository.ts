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
			const game = await Database.Repo.findOne(NbaGameData, { id }, { cache: 3000 });
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
				newGame.officials.add(new NbaOfficial(key));
				Database.Repo.persist(newGame);
			}
			for (const key of gameData.home_stats) {
				newGame.home_stats.add(new NbaStat(key));
				Database.Repo.persist(newGame);
			}
			for (const key of gameData.away_stats) {
				newGame.away_stats.add(new NbaStat(key));
				Database.Repo.persist(newGame);
			}

			await Database.Repo.flush();
			return newGame;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}

	public static async UpdateGame(id: number, newGame: INBAGameData): Promise<NbaGameData> {
		try {
			const exists = await GameDataRepository.FindById(id);

			exists.league = newGame.league;
			exists.away_period_scores = newGame.away_period_scores;
			exists.home_period_scores = newGame.home_period_scores;
			exists.away_team = new TeamInfo(newGame.away_team);
			exists.home_team = new TeamInfo(newGame.home_team);
			exists.away_totals = new NbaTotal(newGame.away_totals);
			exists.home_totals = new NbaTotal(newGame.home_totals);
			exists.event_information = new EventInfo({
				...newGame.event_information,
				site: new SiteInfo(newGame.event_information.site)
			});

			exists.officials.removeAll();
			exists.home_stats.removeAll();
			exists.away_stats.removeAll();

			Database.Repo.persist(exists);

			for (const key of newGame.officials) {
				exists.officials.add(new NbaOfficial(key));
				Database.Repo.persist(exists);
			}
			for (const key of newGame.home_stats) {
				exists.home_stats.add(new NbaStat(key));
				Database.Repo.persist(exists);
			}
			for (const key of newGame.away_stats) {
				exists.away_stats.add(new NbaStat(key));
				Database.Repo.persist(exists);
			}

			await Database.Repo.flush();
			return exists;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}
}