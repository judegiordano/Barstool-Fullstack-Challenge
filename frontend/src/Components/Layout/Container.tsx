import React, { ReactNode } from "react";

interface IContainerProps {
	children: ReactNode
}

export const Container: React.FC<IContainerProps> = ({
	children
}: IContainerProps): JSX.Element => {
	return (
		<>
			<div style={{ padding: "15px", margin: "auto", maxWidth: "1200px" }}>
				{children}
			</div>
		</>
	);
};
