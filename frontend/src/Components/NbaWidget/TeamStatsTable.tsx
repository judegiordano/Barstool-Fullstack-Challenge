import React from "react";
// import Table from "@material-ui/core/Table";
// import TableContainer from "@material-ui/core/TableContainer";

import { IPlayerStats } from "@Types/Abstract";
// import { Header } from "./Table/Header";
// import { Body } from "./Table/Body";
import { NBADataGrid } from "./DataGrid/NBADataGrid";

interface ITeamStatsTable {
	stats: IPlayerStats[]
}

export const TeamStatsTable: React.FC<ITeamStatsTable> = ({
	stats
}: ITeamStatsTable): JSX.Element => {

	return (
		// <TableContainer>
		// 	<Table size="small">
		// 		<Header partial={stats[0]} />
		// 		<Body stats={stats} />
		// 	</Table>
		// </TableContainer>
		<NBADataGrid stats={stats} />
	);
};