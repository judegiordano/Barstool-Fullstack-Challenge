import React from "react";
import { DataGrid } from "@material-ui/data-grid";

import { IFielder } from "@Types/Mlb/Abstract";

interface IFielderTable {
	stats: IFielder[]
}

export const FielderTable: React.FC<IFielderTable> = ({ stats }: IFielderTable): JSX.Element => {
	return (
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
	);
};