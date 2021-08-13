import "dotenv/config";
import "reflect-metadata";
import "module-alias/register";
import os from "os";
import cluster from "cluster";

import { App } from "@Services/Server";
import { Config } from "@Services/Config";

(async () => {
	const cpus = Config.Options.IS_PROD ? os.cpus().length : 1;
	if (cluster.isMaster) {
		for (let i = 0; i < cpus; i++) {
			cluster.fork();
		}
	}
	else await App.Start();
})();