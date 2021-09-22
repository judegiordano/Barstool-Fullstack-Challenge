import React from "react";
import Router from "next/router";
import Button from "@mui/material/Button";

import { AppLayout } from "@Comp/Layout/AppLayout";

const BoxScoreButtons = [
	{ path: "/nba", text: "NBA Boxscore" },
	{ path: "/mlb", text: "MLB Boxscore" },
];

const Home: React.FC = (): JSX.Element => {
	return (
		<AppLayout>
			{
				BoxScoreButtons.map((btn, index) => (
					<div key={index} style={{ paddingTop: "10px" }}>
						<Button
							onClick={() => Router.push(btn.path)}
							variant="contained"
							color="primary">
							{btn.text}
						</Button>
					</div>
				))
			}
		</AppLayout>
	);
};

export default Home;