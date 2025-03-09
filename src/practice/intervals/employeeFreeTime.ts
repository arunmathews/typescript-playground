type Interval = {
	start: number;
	end: number;
};

export function employeeFreeTime(schedule: Interval[][]): Interval[] {
	const intervals = schedule.flatMap((x) => x);
	if (intervals.length === 0) {
		return [];
	}
	intervals.sort((a, b) => a.start - b.start);
	let currentStart = intervals[0].start;
	let currentEnd = intervals[0].end;
	const freeTimes: Array<Interval> = [];
	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i].start <= currentEnd) {
			currentStart = Math.min(currentStart, intervals[i].start);
			currentEnd = Math.max(currentEnd, intervals[i].end);
		} else {
			freeTimes.push({ start: currentEnd, end: intervals[i].start });
			currentStart = intervals[i].start;
			currentEnd = intervals[i].end;
		}
	}

	return freeTimes;
}
