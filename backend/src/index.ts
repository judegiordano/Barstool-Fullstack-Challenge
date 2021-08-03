import "dotenv/config";
import "reflect-metadata";
import "module-alias/register";

import { App } from "./Services/Server";

(async () => {
	await App.Start();
})();