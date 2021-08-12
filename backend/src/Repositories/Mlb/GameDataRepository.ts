import { IEvent, IOffical } from "@Types/Shared";
import { TeamInfo } from "@Models/Shared/TeamInfo";
import { EventInfo } from "@Models/Shared/EventInfo";
import { SiteInfo } from "@Models/Shared/SiteInfo";
import { MlbGameData } from "@Models/MLB/MlbGameData";
import { IBatter, IFielder, IMLBGameData, IPitcher } from "@Types/Mlb/Abstract";
import { MlbOfficial } from "@Models/MLB/MlbOfficials";
import { MlbBatterTotal } from "@Models/MLB/MlbBatterTotal";
import { MlbFielder } from "@Models/MLB/MlbFielder";
import { MlbPitcher } from "@Models/MLB/MlbPitcher";
import { MlbBatter } from "@Models/MLB/MlbBatter";

export class GameDataRepository {

	public static async FindById(id: number): Promise<Partial<MlbGameData>> {
		try {
			const game = await MlbGameData.findOne({ where: { id } });
			if (!game) throw "game not found";
			const { officials } = await MlbGameData.findOne({ where: { id }, relations: ["officials"] }) as MlbGameData;
			const { away_batters } = await MlbGameData.findOne({ where: { id }, relations: ["away_batters"] }) as MlbGameData;
			const { home_batters } = await MlbGameData.findOne({ where: { id }, relations: ["home_batters"] }) as MlbGameData;
			const { away_pitchers } = await MlbGameData.findOne({ where: { id }, relations: ["away_pitchers"] }) as MlbGameData;
			const { home_pitchers } = await MlbGameData.findOne({ where: { id }, relations: ["home_pitchers"] }) as MlbGameData;
			const { away_fielding } = await MlbGameData.findOne({ where: { id }, relations: ["away_fielding"] }) as MlbGameData;
			const { home_fielding } = await MlbGameData.findOne({ where: { id }, relations: ["home_fielding"] }) as MlbGameData;
			const { away_batter_totals } = await MlbGameData.findOne({ where: { id }, relations: ["away_batter_totals"] }) as MlbGameData;
			const { home_batter_totals } = await MlbGameData.findOne({ where: { id }, relations: ["home_batter_totals"] }) as MlbGameData;
			return {
				...game,
				officials,
				away_batters,
				home_batters,
				away_pitchers,
				home_pitchers,
				away_fielding,
				home_fielding,
				away_batter_totals,
				home_batter_totals
			};
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async DeleteById(id: number): Promise<MlbGameData> {
		try {
			const exists = await MlbGameData.findOne({ id });
			if (!exists) throw "game not found";

			return await exists.remove();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertGame(gameData: IMLBGameData): Promise<MlbGameData> {
		try {
			const newAwayTeam = new TeamInfo({ ...gameData.away_team });
			const newHomeTeam = new TeamInfo({ ...gameData.home_team });
			const newAwayBatterTotal = new MlbBatterTotal({ ...gameData.home_batter_totals });
			const newHomeBatterTotal = new MlbBatterTotal({ ...gameData.home_batter_totals });
			const newEvent = await GameDataRepository.InsertEvent(gameData.event_information);
			const newOfficials = await GameDataRepository.InsertMultipleOfficials(gameData.officials);
			const newAwayFielders = await GameDataRepository.InsertMultipleFielders(gameData.away_fielding);
			const newHomeFielders = await GameDataRepository.InsertMultipleFielders(gameData.home_fielding);
			const newHomePitchers = await GameDataRepository.InsertMultiplePitchers(gameData.home_pitchers);
			const newAwayPitchers = await GameDataRepository.InsertMultiplePitchers(gameData.away_pitchers);
			const newAwayBatters = await GameDataRepository.InsertMultipleBatters(gameData.away_batters);
			const newHomeBatters = await GameDataRepository.InsertMultipleBatters(gameData.home_batters);

			// game
			const newGame = new MlbGameData({
				league: gameData.league,
				away_team: newAwayTeam,
				home_team: newHomeTeam,
				officials: newOfficials,
				event_information: newEvent,
				away_period_scores: gameData.away_period_scores,
				home_period_scores: gameData.home_period_scores,
				away_errors: gameData.away_errors,
				home_errors: gameData.home_errors,
				away_batters: newAwayBatters,
				home_batters: newHomeBatters,
				away_pitchers: newHomePitchers,
				home_pitchers: newAwayPitchers,
				away_fielding: newAwayFielders,
				home_fielding: newHomeFielders,
				away_batter_totals: newAwayBatterTotal,
				home_batter_totals: newHomeBatterTotal
			});

			await newAwayTeam.save();
			await newHomeTeam.save();
			await newAwayBatterTotal.save();
			await newHomeBatterTotal.save();
			// insert game
			return await newGame.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertMultipleOfficials(instances: IOffical[]): Promise<MlbOfficial[]> {
		try {
			const temp = [];
			for (const key in instances) {
				const newInstance = new MlbOfficial({ ...instances[key] as IOffical });
				await newInstance.save();
				temp.push(newInstance);
			}
			return temp;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertMultipleFielders(instances: IFielder[]): Promise<MlbFielder[]> {
		try {
			const temp = [];
			for (const key in instances) {
				const newInstance = new MlbFielder({ ...instances[key] as IFielder });
				await newInstance.save();
				temp.push(newInstance);
			}
			return temp;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertMultipleBatters(instances: IBatter[]): Promise<MlbBatter[]> {
		try {
			const temp = [];
			for (const key in instances) {
				const newInstance = new MlbBatter({ ...instances[key] as IBatter });
				await newInstance.save();
				temp.push(newInstance);
			}
			return temp;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertEvent(event: IEvent): Promise<EventInfo> {
		try {
			const newSite = new SiteInfo({ ...event.site });
			const newEvent = new EventInfo({
				...event,
				site: newSite
			});
			await newSite.save();
			return newEvent.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	// this one sucks cuz the prop "save" is reserved in typeorm
	public static async InsertMultiplePitchers(instances: IPitcher[]): Promise<MlbPitcher[]> {
		try {
			const temp = [];
			for (const key in instances) {
				const _new = instances[key] as IPitcher;
				const newInstance = new MlbPitcher();
				newInstance.last_name = _new.last_name;
				newInstance.first_name = _new.first_name;
				newInstance.display_name = _new.display_name;
				newInstance.pitch_order = _new.pitch_order;
				newInstance.win = _new.win;
				newInstance.loss = _new.loss;
				newInstance._save = _new.save;
				newInstance.hold = _new.hold;
				newInstance.era = _new.era;
				newInstance.whip = _new.whip;
				newInstance.innings_pitched = _new.innings_pitched;
				newInstance.hits_allowed = _new.hits_allowed;
				newInstance.runs_allowed = _new.runs_allowed;
				newInstance.earned_runs = _new.earned_runs;
				newInstance.walks = _new.walks;
				newInstance.intentional_walks = _new.intentional_walks;
				newInstance.strike_outs = _new.strike_outs;
				newInstance.home_runs_allowed = _new.home_runs_allowed;
				newInstance.pitch_count = _new.pitch_count;
				newInstance.pitches_strikes = _new.pitches_strikes;
				newInstance.wild_pitches = _new.wild_pitches;
				newInstance.hit_by_pitch = _new.hit_by_pitch;
				newInstance.errors = _new.errors;
				newInstance.team_abbreviation = _new.team_abbreviation;

				await newInstance.save();
				temp.push(newInstance);
			}
			return temp;
		} catch (error) {
			throw new Error(error);
		}
	}
}