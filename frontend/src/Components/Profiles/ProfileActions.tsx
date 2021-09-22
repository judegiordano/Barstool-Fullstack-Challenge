import React from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";

interface IProfileActions {
	twitter_handle: string,
	instagram: string,
	expanded: boolean,
	handleExapnd: React.MouseEventHandler<HTMLButtonElement>
}

export const ProfileActions: React.FC<IProfileActions> = ({
	twitter_handle,
	instagram,
	expanded,
	handleExapnd
}: IProfileActions): JSX.Element => {
	return (
		<CardActions disableSpacing>
			{
				twitter_handle && (
					<IconButton aria-label="twitter" >
						<a target="_blank" rel="noreferrer" href={`https://twitter.com/${twitter_handle}`}>
							<Twitter />
						</a>
					</IconButton>
				)
			}
			{
				instagram && (
					<IconButton aria-label="instagram" >
						<a target="_blank" rel="noreferrer" href={`https://www.instagram.com/${instagram}`}>
							<Instagram />
						</a>
					</IconButton>
				)
			}
			<IconButton
				style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", marginLeft: "auto" }}
				onClick={handleExapnd}
				aria-expanded={expanded}
				aria-label="show more"
			>
				<ExpandMoreIcon />
			</IconButton>
		</CardActions>
	);
};
