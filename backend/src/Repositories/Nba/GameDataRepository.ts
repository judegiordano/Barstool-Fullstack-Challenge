import { INBAGameData } from "@barstool-dev/types";
import { EntityRepository } from "@mikro-orm/core";

import { NbaGameData } from "@Models/NBA/NbaGameData";
import { NbaOfficial } from "@Models/NBA/NbaOfficial";
import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { NbaTotal } from "@Models/NBA/NbaTotal";
import { NbaStat } from "@Models/NBA/NbaStat";

type RequestRepo = EntityRepository<NbaGameData>;

export class GameDataRepository {

	public static async FindById(manager: RequestRepo, id: number): Promise<NbaGameData> {
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

	public static async FindByUid(manager: RequestRepo, uid: string): Promise<NbaGameData> {
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

	public static async InsertGame(manager: RequestRepo, gameData: INBAGameData): Promise<NbaGameData> {
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

		manager.persist(newGame);

		for (const key of gameData.officials) {
			const newOffical = new NbaOfficial(key);
			newGame.officials.add(newOffical);
			manager.persist([newGame, newOffical]);
		}
		for (const key of gameData.home_stats) {
			const newHomeStat = new NbaStat(key);
			newGame.home_stats.add(newHomeStat);
			manager.persist([newGame, newHomeStat]);
		}
		for (const key of gameData.away_stats) {
			const newAwayStat = new NbaStat(key);
			newGame.away_stats.add(newAwayStat);
			manager.persist([newGame, newAwayStat]);
		}

		await manager.flush();
		return newGame;
	}

	public static async UpdateGame(manager: RequestRepo, id: number, newGame: INBAGameData): Promise<NbaGameData> {
		const exists = await GameDataRepository.FindById(manager, id);

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

		manager.persist(exists);

		for (const key of newGame.officials) {
			const newOffical = new NbaOfficial(key);
			exists.officials.add(newOffical);
			manager.persist([exists, newOffical]);
		}
		for (const key of newGame.home_stats) {
			const newHomeStat = new NbaStat(key);
			exists.home_stats.add(newHomeStat);
			manager.persist([exists, newHomeStat]);
		}
		for (const key of newGame.away_stats) {
			const newAwayStat = new NbaStat(key);
			exists.away_stats.add(newAwayStat);
			manager.persist([exists, newAwayStat]);
		}

		await manager.flush();
		return exists;
	}
}