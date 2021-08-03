import { NbaOfficials } from "../Models/NbaOfficials";
// import { NbaGameData } from "../Models/NBA/NbaGameData";

interface IOfficials {
	// game: NbaGameData,
	position: string | null,
	first_name: string,
	last_name: string
}

export class NbaOfficialsRepository {

	public static async Insert(offialData: IOfficials): Promise<NbaOfficials> {
		try {
			const newOfficial = new NbaOfficials();
			// newOfficial.game = offialData.game;
			offialData.position ? newOfficial.position = offialData.position : null;
			newOfficial.first_name = offialData.first_name;
			newOfficial.last_name = offialData.last_name;

			return await newOfficial.save();
		} catch (error) {
			throw new Error(error);
		}
	}
}