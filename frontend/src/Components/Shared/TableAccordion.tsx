import React from "react";
import { IBatterTotal, IStatTotals } from "@barstool-dev/types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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