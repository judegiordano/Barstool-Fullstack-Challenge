import React from "react";
import { DataGrid } from "@material-ui/data-grid";

import { IPlayerStats } from "@Types/Nba/Abstract";

interface INBADataGrid {
	stats: IPlayerStats[]
}

export const NBADataGrid: React.FC<INBADataGrid> = ({ stats }: INBADataGrid): JSX.Element => {
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
							"position": stat.position,
							"minutes": stat.minutes,
							"points": stat.points,
							"assists": stat.assists,
							"turnovers": stat.turnovers,
							"steals": stat.steals,
							"blocks": stat.blocks,
							"field goals attempted": stat.field_goals_attempted,
							"field goals made": stat.field_goals_made,
							"three point field goals attempted": stat.three_point_field_goals_attempted,
							"three point field goals made": stat.three_point_field_goals_made,
							"free throws attempted": stat.free_throws_attempted,
							"free throws made": stat.free_throws_made,
							"defensive rebounds": stat.defensive_rebounds,
							"offensive rebounds": stat.offensive_rebounds,
							"personal fouls": stat.personal_fouls,
							"team abbreviation": stat.team_abbreviation,
							"is starter": stat.is_starter,
							"field goal percentage": stat.field_goal_percentage,
							"three point percentage": stat.three_point_percentage,
							"free throw percentage": stat.free_throw_percentage
						}
					))
				}
			/>
		</div>
	);
};