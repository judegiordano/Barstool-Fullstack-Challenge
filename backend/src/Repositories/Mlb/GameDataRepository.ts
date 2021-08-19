import { IMLBGameData } from "@barstool-dev/types";

import { Database } from "@Services/Database";
import { MlbBatter } from "@Models/MLB/MlbBatter";
import { MlbPitcher } from "@Models/MLB/MlbPitcher";
import { MlbSiteInfo } from "@Models/MLB/MlbSiteInfo";
import { MlbGameData } from "@Models/MLB/MlbGameData";
import { MlbEventInfo } from "@Models/MLB/MlbEventInfo";
import { MlbOfficial } from "@Models/MLB/MlbOfficials";
import { MlbHomeTeamInfo } from "@Models/MLB/MlbHomeTeamInfo";
import { MlbAwayTeamInfo } from "@Models/MLB/MlbAwayTeamInfo";
import { MlbAwayBatterTotal } from "@Models/MLB/MlbAwayBatterTotal";
import { MlbHomeBatterTotal } from "@Models/MLB/MlbHomeBatterTotal";

export class GameDataRepository {

	public static async FindById(id: number): Promise<MlbGameData> {
		try {
			const game = await Database.Repo.findOne(MlbGameData, { id });
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
			newGame.home_team = new MlbHomeTeamInfo(gameData.home_team);
			newGame.away_team = new MlbAwayTeamInfo(gameData.away_team);
			newGame.home_batter_totals = new MlbHomeBatterTotal(gameData.home_batter_totals);
			newGame.away_batter_totals = new MlbAwayBatterTotal(gameData.away_batter_totals);
			newGame.event_information = new MlbEventInfo({
				...gameData.event_information,
				site: new MlbSiteInfo(gameData.event_information.site)
			});

			Database.Repo.persist(newGame);

			for (const key of gameData.officials) {
				const official = new MlbOfficial(key);
				newGame.officials.add(official);
				Database.Repo.persist([official, newGame]);
			}
			for (const key of gameData.home_pitchers) {
				const pitcher = new MlbPitcher(key);
				newGame.home_pitchers.add(pitcher);
				Database.Repo.persist([pitcher, newGame]);
			}
			for (const key of gameData.away_pitchers) {
				const pitcher = new MlbPitcher(key);
				newGame.away_pitchers.add(pitcher);
				Database.Repo.persist([pitcher, newGame]);
			}
			for (const key of gameData.away_batters) {
				const batter = new MlbBatter(key);
				newGame.away_batters.add(batter);
				Database.Repo.persist([batter, newGame]);
			}
			for (const key of gameData.home_batters) {
				const batter = new MlbBatter(key);
				newGame.home_batters.add(batter);
				Database.Repo.persist([batter, newGame]);
			}

			await Database.Repo.flush();
			return newGame;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}
}