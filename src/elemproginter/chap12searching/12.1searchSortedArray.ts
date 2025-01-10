export function searchSorterArray(
	arr: number[],
	target: number,
): number | undefined {
	let lower = 0;
	let upper = arr.length - 1;
	let res: number | undefined = undefined;
	while (lower <= upper) {
		const mid = lower + Math.floor((upper - lower) / 2);
		if (arr[mid] === target) {
			res = mid;
			upper = mid - 1;
		} else if (arr[mid] > target) {
			upper = mid - 1;
		} else {
			lower = mid + 1;
		}
	}

	if (res != null) {
		return res;
	}

	return undefined;
}
