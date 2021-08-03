export class DateTime {

	public static Time(now: Date): string {
		return Intl.DateTimeFormat("en", { hour: "numeric", minute: "numeric", hour12: true }).format(now);
	}

	public static Now(): string {

		const _now = new Date();
		const time = DateTime.Time(_now);

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

	public static Format(date: Date): string {

		const _now = new Date(date);

		const _Date = _now.toLocaleDateString(
			"en-us",
			{
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone: "utc"
			}
		);

		return (_Date);
	}
}