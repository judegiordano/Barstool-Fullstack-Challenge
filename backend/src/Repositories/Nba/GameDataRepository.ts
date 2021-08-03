import { NbaGameData } from "../../Models/NbaGameData";

export class GameDataRepository {

	public static async FindById(id: number): Promise<NbaGameData> {
		try {
			const exists = await NbaGameData.findOne({
				where: { id },
				relations: [
					"home_team",
					"away_team",
					"officials",
					"event_information",
					"event_information.site",
					"away_totals",
					"home_totals",
					"home_stats",
					"away_stats",
				],
				cache: true
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
}