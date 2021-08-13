import React from "react";
import { DataGrid } from "@material-ui/data-grid";

import { IPitcher } from "@Types/Mlb/Abstract";

interface IPitcherTable {
	stats: IPitcher[]
}

export const PitcherTable: React.FC<IPitcherTable> = ({ stats }: IPitcherTable): JSX.Element => {
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
							"pitch order": stat.pitch_order,
							"win": stat.win,
							"loss": stat.loss,
							"save": stat.save,
							"hold": stat.hold,
							"era": stat.era,
							"whip": stat.whip,
							"innings pitched": stat.innings_pitched,
							"hits allowed": stat.hits_allowed,
							"runs allowed": stat.runs_allowed,
							"earned runs": stat.earned_runs,
							"walks": stat.walks,
							"intentional walks": stat.intentional_walks,
							"strike outs": stat.strike_outs,
							"home runs allowed": stat.home_runs_allowed,
							"pitch count": stat.pitch_count,
							"pitches strikes": stat.pitches_strikes,
							"wild pitches": stat.wild_pitches,
							"hit by pitch": stat.hit_by_pitch,
							"errors": stat.errors,
							"team abbreviation": stat.team_abbreviation
						}
					))
				}
			/>
		</div>
	);
};