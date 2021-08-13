import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import { IMLBGameData, INBAGameData, IEvent as IEventInfo } from "@barstool-dev/types";

import { DateTime } from "@Services/Date";

interface IFinalScoreCard {
	gameData: IMLBGameData | INBAGameData,
	homeFinalScore: number,
	awayFinalScore: number
}
interface ITotals {
	homeFinalScore: number,
	awayFinalScore: number,
	homeAbbrev: string,
	awayAbbrev: string
}
interface IEvent {
	eventInformation: IEventInfo
}
interface IPeriodScores {
	homePeriodScore: number[],
	awayPeriodScore: number[],
	homeAbbrev: string,
	awayAbbrev: string
}

const Totals: React.FC<ITotals> = ({ 
	homeFinalScore,
	awayFinalScore,
	homeAbbrev,
	awayAbbrev
}: ITotals): JSX.Element => {
	return (
		<>
			<p style={{ marginTop: "5px", marginBottom: "5px", display: "inline", verticalAlign: "middle" }}>
				{homeAbbrev}
			</p>
			<h1 style={{
				marginTop: "5px", marginBottom: "5px", display: "inline", paddingLeft: "5px", verticalAlign: "middle",
				color: (homeFinalScore > awayFinalScore ? "black" : "gray")
			}}>
				{homeFinalScore}
			</h1>
			<p style={{ verticalAlign: "middle", display: "inline", fontSize: "25px" }}>-</p>
			<h1 style={{
				marginTop: "5px", marginBottom: "5px", display: "inline", paddingRight: "5px", verticalAlign: "middle",
				color: (awayFinalScore > homeFinalScore ? "black" : "gray")
			}}>
				{awayFinalScore}
			</h1>
			<p style={{ marginTop: "5px", marginBottom: "5px", display: "inline", verticalAlign: "middle" }}>
				{awayAbbrev}
			</p>
		</>
	);
};

const PeriodScores: React.FC<IPeriodScores> = ({
	homePeriodScore,
	awayPeriodScore,
	homeAbbrev,
	awayAbbrev
}: IPeriodScores): JSX.Element => {
	return (
		<div>
			<div style={{ verticalAlign: "middle", display: "inline", fontSize: "10px" }}>
				<div>
					<span style={{ fontWeight: "bold", padding: "5px" }}>{homeAbbrev}</span>
					{homePeriodScore.toString().replace(/,/g, " | ")}
				</div>
				<div>
					<span style={{ fontWeight: "bold", padding: "5px" }}>{awayAbbrev}</span>
					{awayPeriodScore.toString().replace(/,/g, " | ")}
				</div>
			</div>
		</div>
	);
};

const EventInfo: React.FC<IEvent> = ({ eventInformation }: IEvent): JSX.Element => {
	return (
		<div style={{textAlign: "left", fontSize: "10px"}}>
			<div>
				{ eventInformation.site.name }
			</div>
			<div>
				{ eventInformation.site.city }, { eventInformation.site.state }
			</div>
			<div>
				{ DateTime.Format(eventInformation.start_date_time) }
			</div>
			<div>
				status: { eventInformation.status }
			</div>
		</div>
	);
};

export const FinalScoreCard: React.FC<IFinalScoreCard> = ({
	gameData,
	homeFinalScore,
	awayFinalScore
}: IFinalScoreCard): JSX.Element => {
	return (
		<Card>
			<CardContent style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "5px" }}>
				<EventInfo
					eventInformation={gameData.event_information}
				/>
				<Totals
					homeFinalScore={homeFinalScore}
					awayFinalScore={awayFinalScore}
					homeAbbrev={gameData.home_team.abbreviation}
					awayAbbrev={gameData.away_team.abbreviation}
				/>
				<PeriodScores
					homePeriodScore={gameData.home_period_scores}
					awayPeriodScore={gameData.away_period_scores}
					homeAbbrev={gameData.home_team.abbreviation}
					awayAbbrev={gameData.away_team.abbreviation}
				/>
			</CardContent>
		</Card>
	);
};
