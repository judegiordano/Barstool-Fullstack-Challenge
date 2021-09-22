import React from "react";
import Router from "next/router";
import { GetStaticProps } from "next";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { AppLayout } from "@Comp/Layout/AppLayout";
import { InternalRest } from "@Services/RestService";
import { ProfileCard } from "@Comp/Profiles/ProfileCard";

interface IIndex {
	authors: IAuthor[]
}

const index: React.FC<IIndex> = ({ authors }: IIndex): JSX.Element => {
	return (
		<AppLayout>
			<Button
				onClick={() => Router.push("/")}
				color="primary">
					home
			</Button>
			<Divider />
			<Grid container spacing={2}>
				{
					authors.map((author, index) => (
						<Grid xs={12} sm={6} md={4} item key={index}>
							<ProfileCard author={author} />
						</Grid>
					))
				}
			</Grid>
		</AppLayout>
	);
};

export default React.memo(index);

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await InternalRest.client.get("authors");
	return {
		props: {
			authors: data
		},
		revalidate: 120
	};
};