export function computeMaxDifference(arr: number[]): number {
	let currentLowest = Infinity;
	let currentMaxDifference = 0;
	if (arr.length === 1) {
		return arr[0];
	}
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] < currentLowest) {
			currentLowest = arr[i];
		} else if (arr[i] - currentLowest > currentMaxDifference) {
			currentMaxDifference = arr[i] - currentLowest;
		}
	}

	return currentMaxDifference;
}
