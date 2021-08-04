import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

import { IStatTotals } from "@/src/Types/Abstract";

interface ITeamTotals {
	totals: IStatTotals
}

export const TeamTotals: React.FC<ITeamTotals> = ({ totals }: ITeamTotals): JSX.Element => {
	return (
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
	);
};