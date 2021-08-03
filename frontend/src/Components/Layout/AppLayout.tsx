import React, { ReactNode } from "react";

import { AppFooter } from "./AppFooter";
import { AppHead } from "./AppHead";

interface IAppLayout {
	children: ReactNode
}

import { Container } from "./Container";

export const AppLayout: React.FC<IAppLayout> = ({ children }: IAppLayout): JSX.Element => {
	return (
		<Container>
			<AppHead title="Barstool BoxScore Demo" />
			{ children }
			<AppFooter />
		</Container>
	);
};