import React from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";

import { AppLayout } from "@Comp/Layout/AppLayout";

const Home: React.FC = (): JSX.Element => {
	return (
		<AppLayout>
			<Button
				onClick={() => Router.push("/nba")}
				variant="contained"
				color="primary">
					NBA Boxscore
			</Button>
		</AppLayout>
	);
};

export default Home;