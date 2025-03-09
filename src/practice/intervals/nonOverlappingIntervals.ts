type Interval = {
	start: number;
	end: number;
};

export function eraseOverlapIntervals(intervalArr: number[][]): number {
	const intervals = intervalArr.map(([start, end]) => ({ start, end }));

	intervals.sort((a, b) => a.end - b.end);
	let currentEnd = intervals[0].end;
	let count = 1;
	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i].start >= currentEnd) {
			count++;
			currentEnd = intervals[i].end;
		}
	}

	return intervals.length - count;
}
