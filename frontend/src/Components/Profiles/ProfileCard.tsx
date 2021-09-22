import React, { useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ProfileSkeleton } from "./ProfileSkeleton";
import { ProfileActions } from "./ProfileActions";
import { ProfileMediaArea } from "./ProfileMediaArea";
import { Links } from "@Services/Constants";

interface IProfileCard {
	author: IAuthor
}

export const ProfileCard: React.FC<IProfileCard> = ({ author }: IProfileCard): JSX.Element => {

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<>
			{
				!author ? (
					<ProfileSkeleton />
				) : (
					<Card>
						<ProfileMediaArea
							name={author.name}
							headshot={author.headshot ?? Links.DefaultProfile}
						/>
						<ProfileActions
							twitter_handle={author.twitter_handle}
							instagram={author.instagram}
							expanded={expanded}
							handleExapnd={handleExpandClick}
						/>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography paragraph>
									{author.bio}
								</Typography>
							</CardContent>
						</Collapse>
					</Card>
				)
			}
		</>
	);
};
