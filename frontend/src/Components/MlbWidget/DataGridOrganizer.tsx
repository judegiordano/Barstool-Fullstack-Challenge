import React from "react";
import Divider from "@mui/material/Divider";
import { IBatter, IFielder, IPitcher, IBatterTotal } from "@barstool-dev/types";

import { BatterTable } from "./DataGrid/BatterTable";
import { FielderTable } from "./DataGrid/FielderTable";
import { PitcherTable } from "./DataGrid/PItcherTable";
import { TableAccordion } from "@Comp/Shared/TableAccordion";

interface IDataGridOrganizer {
	batterStats: IBatter[],
	fielderStats: IFielder[],
	pitcherStats: IPitcher[],
	batterTotalStats: IBatterTotal,
	teamColor: string
}

export const DataGridOrganizer: React.FC<IDataGridOrganizer> = ({
	batterStats,
	fielderStats,
	pitcherStats,
	batterTotalStats,
	teamColor
}: IDataGridOrganizer): JSX.Element => {
	return (
		<>
			<BatterTable stats={batterStats} />
			<div>
				<Divider />
				<FielderTable stats={fielderStats} teamColor={teamColor} />
			</div>
			<div>
				<Divider />
				<PitcherTable stats={pitcherStats} teamColor={teamColor} />
			</div>
			<div>
				<Divider />
				<TableAccordion
					stats={batterTotalStats}
					teamColor={teamColor}
					description="batter totals"
				/>
			</div>
		</>
	);
};