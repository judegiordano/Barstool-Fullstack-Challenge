import React from "react";

import { IBatter } from "@Types/Mlb/Abstract";
import { MLBDataGrid } from "./DataGrid/MLBDataGrid";

interface IBatterStatsTable {
	stats: IBatter[]
}

export const BatterStatsTable: React.FC<IBatterStatsTable> = ({
	stats
}: IBatterStatsTable): JSX.Element => {
	return (
		<MLBDataGrid stats={stats} />
	);
};