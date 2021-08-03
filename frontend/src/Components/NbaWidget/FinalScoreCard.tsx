import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import { INBAGameData } from "@/src/Types/Global";
import { DateTime } from "@Services/Date";

interface IFinalScoreCard {
	gameData: INBAGameData
}

const Totals: React.FC<IFinalScoreCard> = ({ gameData }: IFinalScoreCard): JSX.Element => {
	const homeScore = gameData.home_period_scores.reduce((a, b) => a + b);
	const awayScore = gameData.away_period_scores.reduce((a, b) => a + b);

	return (
		<>
			<p style={{ marginTop: "5px", marginBottom: "5px", display: "inline", verticalAlign: "middle" }}>
				{gameData.home_team.abbreviation}
			</p>
			<h1 style={{
				marginTop: "5px", marginBottom: "5px", display: "inline", paddingLeft: "5px", verticalAlign: "middle",
				color: (homeScore > awayScore ? "black" : "gray")
			}}>
				{homeScore}
			</h1>
			<p style={{ verticalAlign: "middle", display: "inline", fontSize: "25px" }}>-</p>
			<h1 style={{
				marginTop: "5px", marginBottom: "5px", display: "inline", paddingRight: "5px", verticalAlign: "middle",
				color: (awayScore > homeScore ? "black" : "gray")
			}}>
				{awayScore}
			</h1>
			<p style={{ marginTop: "5px", marginBottom: "5px", display: "inline", verticalAlign: "middle" }}>
				{gameData.away_team.abbreviation}
			</p>
		</>
	);
};

const PeriodScores: React.FC<IFinalScoreCard> = ({ gameData }: IFinalScoreCard): JSX.Element => {
	return (
		<div>
			<div style={{ verticalAlign: "middle", display: "inline", fontSize: "10px" }}>
				<div>
					<span style={{ fontWeight: "bold", padding: "5px" }}>{gameData.home_team.abbreviation}</span>
					{gameData.home_period_scores.toString().replace(/,/g, " | ")}
				</div>
				<div>
					<span style={{ fontWeight: "bold", padding: "5px" }}>{gameData.away_team.abbreviation}</span>
					{gameData.away_period_scores.toString().replace(/,/g, " | ")}
				</div>
			</div>
		</div>
	);
};

const EventInfo: React.FC<IFinalScoreCard> = ({ gameData }: IFinalScoreCard): JSX.Element => {
	return (
		<div style={{textAlign: "left", fontSize: "10px"}}>
			<div>
				{ gameData.event_information.site.name }
			</div>
			<div>
				{ gameData.event_information.site.city }, { gameData.event_information.site.state }
			</div>
			<div>
				{ DateTime.Format(gameData.event_information.start_date_time) }
			</div>
			<div>
				status: { gameData.event_information.status }
			</div>
		</div>
	);
};

export const FinalScoreCard: React.FC<IFinalScoreCard> = ({
	gameData
}: IFinalScoreCard): JSX.Element => {
	return (
		<Card>
			<CardContent style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "5px" }}>
				<EventInfo gameData={gameData} />
				<Totals gameData={gameData} />
				<PeriodScores gameData={gameData} />
			</CardContent>
		</Card>
	);
};
