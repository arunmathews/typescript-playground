type Interval = {
	start: number;
	end: number;
};
export function canAttendMeetings(intervalArr: number[][]): boolean {
	const intervals: Array<Interval> = intervalArr.map(([start, end]) => ({
		start,
		end,
	}));

	if (intervals.length === 0) {
		return true;
	}

	intervals.sort((a, b) => a.start - b.start);

	let currentEnd = intervals[0].end;
	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i].start < currentEnd) {
			return false;
		}
		currentEnd = Math.max(currentEnd, intervals[i].end);
	}

	return true;
}
