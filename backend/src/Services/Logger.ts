/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from "fs";
import { cwd } from "process";
import path from "path";

import { Config } from "./Config";

export class Log {

	private static readonly infoPath = (path.join(cwd(), "info.log"));
	private static readonly warnPath = (path.join(cwd(), "info.log"));
	private static readonly errorPath = (path.join(cwd(), "error.log"));

	private static HumanDate(): string {

		const _now = new Date();
		const time = Intl.DateTimeFormat("en", { hour: "numeric", minute: "numeric", hour12: true }).format(_now);

		const _Date = _now.toLocaleDateString(
			"en-us",
			{
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone: "utc"
			}
		);

		return (`${_Date} ${time}`);
	}

	public static Info(data: any, service = "application info"): void {
		const time = Log.HumanDate().toString();
		const log = `{ service: "${service}", level: "info", timestamp: ${new Date().getTime()}, date: "${time}", message: "${data.toString()}" }\n`;
		!Config.Options.IS_PROD && process.stdout.write(log);
		fs.appendFileSync(Log.infoPath, log);
	}

	public static Warn(data: any, service = "application warning"): void {
		const time = Log.HumanDate().toString();
		const log = `{ service: "${service}", level: "warn", timestamp: ${new Date().getTime()}, date: "${time}", message: "${data.toString()}" }\n`;
		!Config.Options.IS_PROD && process.stdout.write(`\x1b[33m${log}\x1b[0m`);
		fs.appendFileSync(Log.warnPath, log);
	}

	public static Error(data: any, stackTrace: string, service = "application error"): void {
		const time = Log.HumanDate().toString();
		const log = `{ service: "${service}", level: "error", timestamp: ${new Date().getTime()}, date: "${time}", message: "${data.toString()}" stackTrace: "${stackTrace}" }\n`;
		!Config.Options.IS_PROD && process.stdout.write(`\x1b[31m${log}\x1b[0m`);
		fs.appendFileSync(Log.errorPath, log);
	}
}