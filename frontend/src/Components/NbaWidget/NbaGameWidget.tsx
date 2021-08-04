import React from "react";

import { INBAGameData } from "@Types/Global";
import { ScoreHeader } from "./ScoreHeader";
import { TeamStatsTable } from "./TeamStatsTable";
import { FinalScoreCard } from "./FinalScoreCard";
import { TeamTotals } from "./Table/TeamTotals";

interface INbaGameWidget {
	gameData: INBAGameData
}

export const NbaGameWidget: React.FC<INbaGameWidget> = ({ gameData }: INbaGameWidget): JSX.Element => {

	const homeScore = gameData.home_period_scores.reduce((a, b) => a + b);
	const awayScore = gameData.away_period_scores.reduce((a, b) => a + b);

	return (
		<>
			<FinalScoreCard gameData={gameData} />
			<div>
				<ScoreHeader
					isHome={false}
					teamName={gameData.away_team.full_name}
					teamScore={awayScore}
				/>
				<TeamStatsTable stats={gameData.away_stats} />
				<TeamTotals totals={gameData.away_totals} />
				<ScoreHeader
					isHome
					teamName={gameData.home_team.full_name}
					teamScore={homeScore}
				/>
				<TeamStatsTable stats={gameData.home_stats} />
				<TeamTotals totals={gameData.home_totals} />
			</div>
		</>
	);
};