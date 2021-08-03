import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

import "../styles/globals.css";
import "@styles/table.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
	return <Component {...pageProps} />;
};

export default MyApp;