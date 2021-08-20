import { IMLBGameData } from "@barstool-dev/types";

import { Database } from "@Services/Database";
import { MlbBatter } from "@Models/MLB/MlbBatter";
import { MlbPitcher } from "@Models/MLB/MlbPitcher";
import { MlbGameData } from "@Models/MLB/MlbGameData";
import { MlbOfficial } from "@Models/MLB/MlbOfficials";
import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { MlbBatterTotal } from "@Models/MLB/MlbBatterTotal";

export class GameDataRepository {

	public static async FindById(id: number): Promise<MlbGameData> {
		try {
			const game = await Database.Repo.findOne(MlbGameData, { id }, { cache: 3000 });
			if (!game) throw "game not found";
			return game;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async DeleteById(id: number): Promise<boolean> {
		try {
			const exists = await Database.Repo.findOne(MlbGameData, { id });
			if (!exists) throw "game not found";
			await Database.Repo.removeAndFlush(exists);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertGame(gameData: IMLBGameData): Promise<MlbGameData> {
		try {
			const newGame = new MlbGameData();
			newGame.league = gameData.league;
			newGame.away_period_scores = gameData.away_period_scores;
			newGame.home_period_scores = gameData.home_period_scores;
			newGame.away_errors = gameData.away_errors;
			newGame.home_errors = gameData.home_errors;
			newGame.home_team = new TeamInfo(gameData.home_team);
			newGame.away_team = new TeamInfo(gameData.away_team);
			newGame.home_batter_totals = new MlbBatterTotal(gameData.home_batter_totals);
			newGame.away_batter_totals = new MlbBatterTotal(gameData.away_batter_totals);
			newGame.event_information = new EventInfo({
				...gameData.event_information,
				site: new SiteInfo(gameData.event_information.site)
			});

			Database.Repo.persist(newGame);

			for (const key of gameData.officials) {
				newGame.officials.add(new MlbOfficial(key));
				Database.Repo.persist(newGame);
			}
			for (const key of gameData.home_pitchers) {
				newGame.home_pitchers.add(new MlbPitcher(key));
				Database.Repo.persist(newGame);
			}
			for (const key of gameData.away_pitchers) {
				newGame.away_pitchers.add(new MlbPitcher(key));
				Database.Repo.persist(newGame);
			}
			for (const key of gameData.away_batters) {
				newGame.away_batters.add(new MlbBatter(key));
				Database.Repo.persist(newGame);
			}
			for (const key of gameData.home_batters) {
				newGame.home_batters.add(new MlbBatter(key));
				Database.Repo.persist(newGame);
			}

			await Database.Repo.flush();
			return newGame;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}

	public static async UpdateGame(id: number, newGame: IMLBGameData): Promise<MlbGameData> {
		try {
			const exists = await GameDataRepository.FindById(id);

			exists.league = newGame.league;
			exists.away_period_scores = newGame.away_period_scores;
			exists.home_period_scores = newGame.home_period_scores;
			exists.away_errors = newGame.away_errors;
			exists.home_errors = newGame.home_errors;
			exists.home_team = new TeamInfo(newGame.home_team);
			exists.away_team = new TeamInfo(newGame.away_team);
			exists.home_batter_totals = new MlbBatterTotal(newGame.home_batter_totals);
			exists.away_batter_totals = new MlbBatterTotal(newGame.away_batter_totals);
			exists.event_information = new EventInfo({
				...newGame.event_information,
				site: new SiteInfo(newGame.event_information.site)
			});

			exists.officials.removeAll();
			exists.home_pitchers.removeAll();
			exists.away_pitchers.removeAll();
			exists.away_batters.removeAll();
			exists.home_batters.removeAll();
			Database.Repo.persist(exists);

			for (const key of newGame.officials) {
				exists.officials.add(new MlbOfficial(key));
				Database.Repo.persist(exists);
			}
			for (const key of newGame.home_pitchers) {
				exists.home_pitchers.add(new MlbPitcher(key));
				Database.Repo.persist(exists);
			}
			for (const key of newGame.away_pitchers) {
				exists.away_pitchers.add(new MlbPitcher(key));
				Database.Repo.persist(exists);
			}
			for (const key of newGame.away_batters) {
				exists.away_batters.add(new MlbBatter(key));
				Database.Repo.persist(exists);
			}
			for (const key of newGame.home_batters) {
				exists.home_batters.add(new MlbBatter(key));
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