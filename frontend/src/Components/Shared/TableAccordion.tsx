import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IBatterTotal } from "@Types/Mlb/Abstract";
import { IStatTotals } from "@Types/Nba/Abstract";

interface ITableAccordion {
	stats: IBatterTotal | IStatTotals,
	teamColor: string,
	description: string
}

export const TableAccordion: React.FC<ITableAccordion> = ({ stats, teamColor, description }: ITableAccordion): JSX.Element => {
	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				style={{ backgroundColor: teamColor, color: "White", fontFamily: "'Open Sans', sans-serif" }}
				expandIcon={<ExpandMoreIcon />}
			>
				{description}
			</AccordionSummary>
			<AccordionDetails>
				<TableContainer>
					<Table>
						<TableHead style={{ background: "black" }}>
							<TableRow>
								{Object.keys(stats).map((name, index) => (
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
								{Object.values(stats).map((stat, index) => (
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