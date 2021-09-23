import React from "react";
import { IFielder } from "@barstool-dev/types";
import { DataGrid } from "@mui/x-data-grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IFielderTable {
	stats: IFielder[],
	teamColor: string
}

export const FielderTable: React.FC<IFielderTable> = ({ stats, teamColor }: IFielderTable): JSX.Element => {
	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				style={{
					backgroundColor: teamColor,
					color: "White",
					fontFamily: "'Open Sans', sans-serif",
					width: "100%",
					paddingLeft: 10,
					paddingRight: 10
				}}
				expandIcon={<ExpandMoreIcon />}
			>
			fielders
			</AccordionSummary>
			<AccordionDetails>
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