import React from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import { GetStaticProps } from "next";

import { Rest } from "@Services/RestService";
import { INBAGameData } from "@Types/Global";
import { NbaGameWidget } from "@Comp/NbaWidget/NbaGameWidget";
import { AppLayout } from "@/src/Components/Layout/AppLayout";
import { Divider } from "@material-ui/core";

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

export default Index;

export const getStaticProps: GetStaticProps = async () => {

	const { data } = await Rest.Get("stats/nba/");

	return {
		props: {
			statData: data.data
		},
		revalidate: 60
	};
};
