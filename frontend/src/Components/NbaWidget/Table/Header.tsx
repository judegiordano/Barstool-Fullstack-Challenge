import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { IPlayerStats } from "@Types/Abstract";

interface IHeader {
	partial: IPlayerStats
}

export const Header: React.FC<IHeader> = ({ partial }: IHeader): JSX.Element => {
	return (
		<TableHead style={{ background: "black" }}>
			<TableRow>
				{ Object.keys(partial).map((name, index) => (
					<TableCell
						key={index}
						style={{ color: "white" }}>
						{ name.replace(/_/g, " ") }
					</TableCell>
				)) }
			</TableRow>
		</TableHead>
	);
};
