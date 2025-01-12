export function findLowestCyclicallySorted(arr: number[]): number {
	let lower = 0;
	let upper = arr.length - 1;
	while (lower < upper) {
		const mid = lower + Math.floor((upper - lower) / 2);
		if (arr[mid] > arr[upper]) {
			lower = mid + 1;
		} else {
			upper = mid;
		}
	}

	return lower;
}
