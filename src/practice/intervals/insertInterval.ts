type Interval = {
	start: number;
	end: number;
};
export function insert(
	intervalArr: number[][],
	newIntervalArr: number[],
): number[][] {
	const intervals = intervalArr.map(([start, end]) => ({ start, end }));
	const newInterval = { start: newIntervalArr[0], end: newIntervalArr[1] };
	let merged: Array<Interval> = [];
	let i = 0;
	let n = intervals.length;
	while (i < n && intervals[i].end < newInterval.start) {
		merged.push(intervals[i]);
		i++;
	}
	let mergedIntervalStart: number = newInterval.start;
	let mergedIntervalEnd: number = newInterval.end;
	while (i < n && intervals[i].start <= newInterval.end) {
		mergedIntervalStart = Math.min(mergedIntervalStart, intervals[i].start);
		mergedIntervalEnd = Math.max(mergedIntervalEnd, intervals[i].end);
		i++;
	}
	merged.push({ start: mergedIntervalStart, end: mergedIntervalEnd });

	while (i < n) {
		merged.push(intervals[i]);
		i++;
	}

	return merged.map((interval) => [interval.start, interval.end]);
}
