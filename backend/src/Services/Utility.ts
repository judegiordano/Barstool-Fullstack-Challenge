export class Utility {

	public static GetDiffInSeconds(date1: Date, date2: Date): number {
		const then = new Date(date1).getTime();
		const now = new Date(date2).getTime();
		return ((now - then) / 1000);
	}

}