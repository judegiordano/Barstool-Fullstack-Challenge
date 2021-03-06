import React from "react";
import Router from "next/router";
import { GetStaticProps } from "next";
import { IMLBGameData } from "@barstool-dev/types";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { Rest } from "@Services/RestService";
import { MlbGameWidget } from "@Comp/MlbWidget/MlbGameWidget";
import { AppLayout } from "@Comp/Layout/AppLayout";

interface IIndex {
	statData: IMLBGameData
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
			<MlbGameWidget gameData={statData} />
		</AppLayout>
	);
};

export default React.memo(Index);

export const getStaticProps: GetStaticProps = async () => {

	const { data } = await Rest.Get("stats/mlb/");

	return {
		props: {
			statData: data.data
		},
		revalidate: 60
	};
};
