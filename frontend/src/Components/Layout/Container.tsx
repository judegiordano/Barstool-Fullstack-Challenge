import React from "react";

interface IContainerProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any
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
