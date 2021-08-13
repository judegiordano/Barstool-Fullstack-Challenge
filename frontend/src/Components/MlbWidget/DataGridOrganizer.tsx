import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

import { IBatter, IFielder, IPitcher, IBatterTotal } from "@Types/Mlb/Abstract";
import { BatterTable } from "./DataGrid/BatterTable";
import { BatterTotalTable } from "./DataGrid/BatterTotalTable";
import { FielderTable } from "./DataGrid/FielderTable";
import { PitcherTable } from "./DataGrid/PItcherTable";

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
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						style={{ backgroundColor: teamColor, color: "White", fontFamily: "'Open Sans', sans-serif" }}
						expandIcon={<ExpandMoreIcon />}
					>
						fiedlers
					</AccordionSummary>
					<AccordionDetails>
						<FielderTable stats={fielderStats} />
					</AccordionDetails>
				</Accordion>
			</div>
			<div>
				<Divider />
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						style={{ backgroundColor: teamColor, color: "White", fontFamily: "'Open Sans', sans-serif" }}
						expandIcon={<ExpandMoreIcon />}
					>
						pitchers
					</AccordionSummary>
					<AccordionDetails>
						<PitcherTable stats={pitcherStats} />
					</AccordionDetails>
				</Accordion>
			</div>
			<div>
				<Divider />
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						style={{ backgroundColor: teamColor, color: "White", fontFamily: "'Open Sans', sans-serif" }}
						expandIcon={<ExpandMoreIcon />}
					>
						batter totals
					</AccordionSummary>
					<AccordionDetails>
						<BatterTotalTable stats={[batterTotalStats]} />
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};