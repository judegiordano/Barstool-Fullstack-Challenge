import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IFielder } from "@barstool-dev/types";

interface IFielderTable {
	stats: IFielder[],
	teamColor: string
}

export const FielderTable: React.FC<IFielderTable> = ({ stats, teamColor }: IFielderTable): JSX.Element => {
	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				style={{ backgroundColor: teamColor, color: "White", fontFamily: "'Open Sans', sans-serif" }}
				expandIcon={<ExpandMoreIcon />}
			>
			fiedlers
			</AccordionSummary>
			<AccordionDetails>
				{/* <FielderTable stats={fielderStats} /> */}
				<div style={{ height: 500, width: "100%" }}>
					<DataGrid
						pageSize={6}
						disableSelectionOnClick={true}
						columns={Object.keys(stats[0]).map((value) => ({ field: value.replace(/_/g, " "), width: 200 }))}
						rows={
							stats.map((stat, index) => (
								{
									"id": index,
									"last name": stat.last_name,
									"first name": stat.first_name,
									"display name": stat.display_name,
									"errors": stat.errors,
									"team abbreviation": stat.team_abbreviation
								}
							))
						}
					/>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};