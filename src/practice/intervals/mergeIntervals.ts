type Interval = {
	start: number;
	end: number;
};
export function merge(intervalArr: number[][]): number[][] {
	if (intervalArr.length === 0) {
		return [];
	}
	const intervals = intervalArr.map(([start, end]) => ({ start, end }));
	intervals.sort((a, b) => a.start - b.start);
	const merged: Array<Interval> = [];
	let currentStart = intervals[0].start;
	let currentEnd = intervals[0].end;
	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i].start <= currentEnd) {
			currentStart = Math.min(currentStart, intervals[i].start);
			currentEnd = Math.max(currentEnd, intervals[i].end);
		} else {
			merged.push({ start: currentStart, end: currentEnd });
			currentStart = intervals[i].start;
			currentEnd = intervals[i].end;
		}
	}

	merged.push({ start: currentStart, end: currentEnd });
	return merged.map(({ start, end }) => [start, end]);
}
