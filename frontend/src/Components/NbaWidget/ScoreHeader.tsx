import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { NBATeamColors } from "@Services/Constants";

interface IScoreHeader {
	isHome: boolean,
	teamName: string,
	teamScore: number
}

export const ScoreHeader: React.FC<IScoreHeader> = ({
	isHome,
	teamName,
	teamScore
}: IScoreHeader): JSX.Element => {

	const nameReg = new RegExp(teamName.trim().toUpperCase(), "i");
	const team = NBATeamColors.find(a => a.name.match(nameReg));

	return (
		<div style={{paddingTop: "10px"}}>
			<Card style={{background: team.hex}}>
				<CardContent style={{color: "white"}}>
					<p style={{fontWeight:"lighter", marginBottom: "0", fontSize: "10px"}}>{ isHome ? "home" : "away" }</p>
					<p style={{verticalAlign: "middle", fontWeight: "bold", display: "inline", paddingRight: "5px", fontFamily: "'Open Sans', sans-serif"}}>{ teamName }</p>
					<h1 style={{verticalAlign: "middle", display: "inline"}}>{ teamScore }</h1>
				</CardContent>
			</Card>
		</div>
	);
};