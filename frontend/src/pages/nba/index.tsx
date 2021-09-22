import React from "react";
import Router from "next/router";
import { GetStaticProps } from "next";
import { INBAGameData } from "@barstool-dev/types";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { Rest } from "@Services/RestService";
import { NbaGameWidget } from "@Comp/NbaWidget/NbaGameWidget";
import { AppLayout } from "@Comp/Layout/AppLayout";

interface IIndex {
	statData: INBAGameData
}

const Index = ({ statData }: IIndex): JSX.Element => {
	return (
		<AppLayout>
			<Button
				onClick={() => Router.push("/")}
				color="primary">
					home
			</Button>
			<Divider />
			<NbaGameWidget gameData={statData} />
		</AppLayout>
	);
};

export default React.memo(Index);

export const getStaticProps: GetStaticProps = async () => {

	const { data } = await Rest.Get("stats/nba/");

	return {
		props: {
			statData: data.data
		},
		revalidate: 60
	};
};
