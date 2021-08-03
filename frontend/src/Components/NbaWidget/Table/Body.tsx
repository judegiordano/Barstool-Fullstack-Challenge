import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { IPlayerStats } from "@Types/Abstract";
import TableStyles from "@styles/Table.module.css";

interface IBody {
	stats: IPlayerStats[]
}

export const Body: React.FC<IBody> = ({ stats }: IBody): JSX.Element => {
	return (
		<TableBody>
			{ stats.map((stat, index) => (
				<TableRow className={TableStyles.styledRow} key={index}>
					{ Object.keys(stat).map((_, index) => (
						<TableCell key={index}>{ Object.values(stat)[index].toString() }</TableCell>
					)) }
				</TableRow>
			)) }
		</TableBody>
	);
};
