import React from "react";
import { GetServerSideProps } from "next";
import Grid from "@mui/material/Grid";

import { AppLayout } from "@Comp/Layout/AppLayout";
import { InternalRest } from "@Services/RestService";
import { ProfileCard } from "@Comp/Profiles/ProfileCard";

interface IIndex {
	authors: IAuthor[]
}

const index: React.FC<IIndex> = ({ authors }: IIndex): JSX.Element => {
	return (
		<AppLayout>
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

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await InternalRest.client.get("authors");
	return {
		props: {
			authors: data
		}
	};
};