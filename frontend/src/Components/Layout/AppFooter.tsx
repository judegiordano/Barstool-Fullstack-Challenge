import React from "react";

export const AppFooter: React.FC = (): JSX.Element => {
	return (
		<footer style={styles.footer}>
			<div style={{paddingTop: "10px"}}>
				&#169; Copyright {new Date().getFullYear()}
			</div>
		</footer>
	);
};

const styles = {
	footer: {
		marginTop: "10px",
		width: "100%",
		height: "100px",
		borderTop: "1px solid #eaeaea",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center"	
	}
} as IStyles;