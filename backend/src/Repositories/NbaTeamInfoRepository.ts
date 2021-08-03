import { ITeamInfo } from "@/Types/Abstract";
import { NbaTeamInfo } from "../Models/NbaTeamInfo";

export class NbaTeamInfoRepository {

	public static async Insert(teamData: ITeamInfo): Promise<NbaTeamInfo> {
		try {
			const newTeam = new NbaTeamInfo();
			newTeam.team_id = teamData.team_id;
			newTeam.abbreviation = teamData.abbreviation;
			newTeam.active = teamData.active;
			newTeam.first_name = teamData.first_name;
			newTeam.last_name = teamData.last_name;
			newTeam.conference = teamData.conference;
			newTeam.division = teamData.division;
			newTeam.site_name = teamData.site_name;
			newTeam.city = teamData.city;
			newTeam.state = teamData.state;
			newTeam.full_name = teamData.full_name;
			return await newTeam.save();
		} catch (error) {
			throw new Error(error);
		}
	}
}