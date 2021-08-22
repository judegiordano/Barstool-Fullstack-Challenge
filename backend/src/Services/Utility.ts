export class Utility {

	public static GetDiffInSeconds(date1: Date, date2: Date): number {
		const then = new Date(date1).getTime();
		const now = new Date(date2).getTime();
		return ((now - then) / 1000);
	}

	public static CreateUuid(): string {
		let dt = new Date().getTime();
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}
}