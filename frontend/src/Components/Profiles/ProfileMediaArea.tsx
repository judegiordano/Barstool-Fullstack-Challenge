import React from "react";
import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Links } from "@Services/Constants";

interface IProfileMediaArea {
	name: string
	headshot: string
}

export const ProfileMediaArea: React.FC<IProfileMediaArea> = ({
	name,
	headshot
}: IProfileMediaArea) => {
	return (
		<CardActionArea>
			<CardMedia>
				<Image
					loading="eager"
					placeholder={"blur"}
					priority
					blurDataURL={Links.DefaultProfile}
					width={50}
					height={30}
					alt={name}
					src={headshot}
					draggable={false}
					layout="responsive"
				/>
			</CardMedia>
			<CardContent>
				<Typography gutterBottom variant="h5" style={{ fontWeight: "bolder" }} component="div">
					{name}
				</Typography>
			</CardContent>
		</CardActionArea>
	);
};
