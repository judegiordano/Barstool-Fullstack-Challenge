import React from "react";

import { IMLBGameData } from "@Types/Mlb/Abstract";
import { ScoreHeader } from "./HeadWidget/ScoreHeader";
import { DataGridOrganizer } from "./DataGridOrganizer";
import { FinalScoreCard } from "./HeadWidget/FinalScoreCard";
import { MlbTeamColors } from "@Services/Constants";

interface IMlbGameWidget {
	gameData: IMLBGameData
}

export const MlbGameWidget: React.FC<IMlbGameWidget> = ({ gameData }: IMlbGameWidget): JSX.Element => {

	const homeScore = gameData.home_period_scores.reduce((a, b) => a + b);
	const awayScore = gameData.away_period_scores.reduce((a, b) => a + b);

	const awayName = new RegExp(gameData.away_team.full_name.trim().toUpperCase(), "i");
	const awayTeam = MlbTeamColors.find(a => a.name.match(awayName));

	const homeName = new RegExp(gameData.home_team.full_name.trim().toUpperCase(), "i");
	const homeTeam = MlbTeamColors.find(a => a.name.match(homeName));

	return (
		<>
			<FinalScoreCard
				awayFinalScore={awayScore}
				homeFinalScore={homeScore}
				gameData={gameData}
			/>
			<div>
				<ScoreHeader
					teamHex={awayTeam.hex}
					isHome={false}
					teamName={gameData.away_team.full_name}
					teamScore={awayScore}
				/>
				<DataGridOrganizer
					batterStats={gameData.away_batters}
					fielderStats={gameData.away_fielding}
					pitcherStats={gameData.away_pitchers}
					batterTotalStats={gameData.away_batter_totals}
					teamColor={awayTeam.hex}
				/>
				<ScoreHeader
					teamHex={homeTeam.hex}
					isHome
					teamName={gameData.home_team.full_name}
					teamScore={homeScore}
				/>
				<DataGridOrganizer
					batterStats={gameData.home_batters}
					fielderStats={gameData.home_fielding}
					pitcherStats={gameData.home_pitchers}
					batterTotalStats={gameData.home_batter_totals}
					teamColor={homeTeam.hex}
				/>
			</div>
		</>
	);
};