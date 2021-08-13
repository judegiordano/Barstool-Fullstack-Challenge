import React from "react";
import { DataGrid } from "@material-ui/data-grid";

import { IBatter } from "@Types/Mlb/Abstract";

interface IBatterTable {
	stats: IBatter[]
}

export const BatterTable: React.FC<IBatterTable> = ({ stats }: IBatterTable): JSX.Element => {
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
							"bat order": stat.bat_order,
							"sub bat order": stat.sub_bat_order,
							"sacrifices": stat.sacrifices,
							"at bats": stat.at_bats,
							"plate appearances": stat.plate_appearances,
							"singles": stat.singles,
							"doubles": stat.doubles,
							"triples": stat.triples,
							"home runs": stat.home_runs,
							"sac flies": stat.sac_flies,
							"sac hits": stat.sac_hits,
							"stolen bases": stat.stolen_bases,
							"caught stealing": stat.caught_stealing,
							"rbi with two outs": stat.rbi_with_two_outs,
							"total bases": stat.total_bases,
							"runs": stat.runs,
							"hits": stat.hits,
							"rbi": stat.rbi,
							"walks": stat.walks,
							"strike outs": stat.strike_outs,
							"left on base": stat.left_on_base,
							"hit by pitch": stat.hit_by_pitch,
							"team abbreviation": stat.team_abbreviation,
							"ops": stat.ops,
							"avg": stat.avg,
							"obp": stat.obp,
							"slg": stat.slg,
							"at bats per home run": stat.at_bats_per_home_run,
							"at bats per rbi": stat.at_bats_per_rbi,
							"walk rate": stat.walk_rate,
							"plate appearances per rbi": stat.plate_appearances_per_rbi,
							"plate appearances per home run": stat.plate_appearances_per_home_run,
							"extra base hits": stat.extra_base_hits,
							"stolen base average": stat.stolen_base_average,
							"strikeout rate": stat.strikeout_rate,
							"ops string": stat.ops_string,
							"slg string": stat.slg_string,
							"obp string": stat.obp_string,
							"avg string": stat.avg_string,
							"batting highlights": stat.batting_highlights
						}
					))
				}
			/>
		</div>
	);
};