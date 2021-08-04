import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IStatTotals } from "@/src/Types/Abstract";

interface ITeamTotals {
	totals: IStatTotals,
	teamColor: string
}

export const TeamTotals: React.FC<ITeamTotals> = ({ totals, teamColor }: ITeamTotals): JSX.Element => {
	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				style={{backgroundColor: teamColor, color: "White", fontFamily: "'Open Sans', sans-serif"}}
				expandIcon={<ExpandMoreIcon />}
			>
				team totals
			</AccordionSummary>
			<AccordionDetails>
				<TableContainer>
					<Table>
						<TableHead style={{ background: "black" }}>
							<TableRow>
								{Object.keys(totals).map((name, index) => (
									<TableCell
										key={index}
										style={{ color: "white" }}>
										{name.replace(/_/g, " ")}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								{Object.values(totals).map((stat, index) => (
									<TableCell key={index}>{stat}</TableCell>
								))}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</AccordionDetails>
		</Accordion>
	);
};