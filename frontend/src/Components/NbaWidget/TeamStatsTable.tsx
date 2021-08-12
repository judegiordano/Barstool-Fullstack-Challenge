import React from "react";

import { IPlayerStats } from "@Types/Nba/Abstract";
import { NBADataGrid } from "./DataGrid/NBADataGrid";

interface ITeamStatsTable {
	stats: IPlayerStats[]
}

export const TeamStatsTable: React.FC<ITeamStatsTable> = ({
	stats
}: ITeamStatsTable): JSX.Element => {

	return (
		<NBADataGrid stats={stats} />
	);
};