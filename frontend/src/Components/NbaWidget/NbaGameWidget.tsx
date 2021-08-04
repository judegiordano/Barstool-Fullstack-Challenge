import React from "react";

import { INBAGameData } from "@Types/Global";
import { ScoreHeader } from "./ScoreHeader";
import { TeamStatsTable } from "./TeamStatsTable";
import { FinalScoreCard } from "./FinalScoreCard";
import { TeamTotals } from "./Table/TeamTotals";
import { NBATeamColors } from "@Services/Constants";

interface INbaGameWidget {
	gameData: INBAGameData
}

export const NbaGameWidget: React.FC<INbaGameWidget> = ({ gameData }: INbaGameWidget): JSX.Element => {

	const homeScore = gameData.home_period_scores.reduce((a, b) => a + b);
	const awayScore = gameData.away_period_scores.reduce((a, b) => a + b);

	const awayName = new RegExp(gameData.away_team.full_name.trim().toUpperCase(), "i");
	const awayTeam = NBATeamColors.find(a => a.name.match(awayName));

	const homeName = new RegExp(gameData.home_team.full_name.trim().toUpperCase(), "i");
	const homeTeam = NBATeamColors.find(a => a.name.match(homeName));

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
				<TeamStatsTable stats={gameData.away_stats} />
				<TeamTotals
					totals={gameData.away_totals}
					teamColor={awayTeam.hex}
				/>
				<ScoreHeader
					teamHex={homeTeam.hex}
					isHome
					teamName={gameData.home_team.full_name}
					teamScore={homeScore}
				/>
				<TeamStatsTable stats={gameData.home_stats} />
				<TeamTotals
					totals={gameData.home_totals}
					teamColor={homeTeam.hex}
				/>
			</div>
		</>
	);
};