import { EntityRepository } from "@mikro-orm/core";
import { IMLBGameData } from "@barstool-dev/types";

import { MlbBatter } from "@Models/MLB/MlbBatter";
import { MlbPitcher } from "@Models/MLB/MlbPitcher";
import { MlbGameData } from "@Models/MLB/MlbGameData";
import { MlbOfficial } from "@Models/MLB/MlbOfficials";
import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { MlbBatterTotal } from "@Models/MLB/MlbBatterTotal";
import { MlbFielder } from "@Models/MLB/MlbFielder";

type RequestRepo = EntityRepository<MlbGameData>;

export class GameDataRepository {

	public static async FindById(manager: RequestRepo, id: number): Promise<MlbGameData> {
		const game = await manager.findOne({ id }, { cache: 3000 });
		if (!game) throw new Error("game not found");
		return game;
	}

	public static async GetAllUids(manager: RequestRepo, pageNumber: number, limit: number): Promise<string[]> {
		const uids = [];
		const games = await manager.find({}, { limit, offset: (pageNumber - 1) * limit });
		if (!games) throw new Error("no games found");
		for (const key of games) {
			uids.push(key.uid);
		}
		return uids;
	}

	public static async FindByUid(manager: RequestRepo, uid: string): Promise<MlbGameData> {
		const game = await manager.findOne({ uid }, { cache: 3000 });
		if (!game) throw new Error("game not found");
		return game;
	}

	public static async DeleteById(manager: RequestRepo, id: number): Promise<boolean> {
		const exists = await manager.findOne({ id });
		if (!exists) throw new Error("game not found");
		await manager.removeAndFlush(exists);
		return true;
	}

	public static async InsertGame(manager: RequestRepo, gameData: IMLBGameData): Promise<MlbGameData> {
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

		manager.persist(newGame);

		for (const key of gameData.officials) {
			const newOfficial = new MlbOfficial(key);
			newGame.officials.add(newOfficial);
			manager.persist([newGame, newOfficial]);
		}
		for (const key of gameData.home_pitchers) {
			const newPitcher = new MlbPitcher(key);
			newGame.home_pitchers.add(newPitcher);
			manager.persist([newGame, newPitcher]);
		}
		for (const key of gameData.away_pitchers) {
			const newPitcher = new MlbPitcher(key);
			newGame.away_pitchers.add(newPitcher);
			manager.persist([newGame, newPitcher]);
		}
		for (const key of gameData.away_batters) {
			const newBatter = new MlbBatter(key);
			newGame.away_batters.add(newBatter);
			manager.persist([newGame, newBatter]);
		}
		for (const key of gameData.home_batters) {
			const newBatter = new MlbBatter(key);
			newGame.home_batters.add(newBatter);
			manager.persist([newGame, newBatter]);
		}
		for (const key of gameData.away_fielding) {
			const newFielder = new MlbFielder(key);
			newGame.away_fielding.add(newFielder);
			manager.persist([newGame, newFielder]);
		}
		for (const key of gameData.home_fielding) {
			const newFielder = new MlbFielder(key);
			newGame.home_fielding.add(newFielder);
			manager.persist([newGame, newFielder]);
		}

		await manager.flush();
		return newGame;
	}

	public static async UpdateGame(manager: RequestRepo, id: number, newGame: IMLBGameData): Promise<MlbGameData> {
		const exists = await GameDataRepository.FindById(manager, id);

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
		exists.away_fielding.removeAll();
		exists.home_fielding.removeAll();
		manager.persist(exists);

		for (const key of newGame.officials) {
			const newOfficial = new MlbOfficial(key);
			exists.officials.add(newOfficial);
			manager.persist([exists, newOfficial]);
		}
		for (const key of newGame.home_pitchers) {
			const newPitcher = new MlbPitcher(key);
			exists.home_pitchers.add(newPitcher);
			manager.persist([exists, newPitcher]);
		}
		for (const key of newGame.away_pitchers) {
			const newPitcher = new MlbPitcher(key);
			exists.away_pitchers.add(newPitcher);
			manager.persist([exists, newPitcher]);
		}
		for (const key of newGame.away_batters) {
			const newBatter = new MlbBatter(key);
			exists.away_batters.add(newBatter);
			manager.persist([exists, newBatter]);
		}
		for (const key of newGame.home_batters) {
			const newBatter = new MlbBatter(key);
			exists.home_batters.add(newBatter);
			manager.persist([exists, newBatter]);
		}
		for (const key of newGame.away_fielding) {
			const newFielder = new MlbFielder(key);
			exists.away_fielding.add(newFielder);
			manager.persist([exists, newFielder]);
		}
		for (const key of newGame.home_fielding) {
			const newFielder = new MlbFielder(key);
			exists.home_fielding.add(newFielder);
			manager.persist([exists, newFielder]);
		}

		await manager.flush();
		return exists;
	}
}