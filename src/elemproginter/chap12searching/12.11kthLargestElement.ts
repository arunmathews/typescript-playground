export function kthLargestElement(
	arr: Array<number>,
	k: number,
): number | undefined {
	let start = 0;
	let end = arr.length - 1;
	const target = arr.length - k;
	while (start <= end) {
		const mid = partition(arr, start, end);
		if (mid === target) {
			return arr[mid];
		} else if (mid < target) {
			start = mid + 1;
		} else {
			end = mid - 1;
		}
	}

	return undefined;
}

function partition(arr: number[], start: number, end: number): number {
	const pivotIdx = start + Math.floor((end - start) / 2);
	const pivot = arr[pivotIdx];
	let lower = start;
	let mid = start;
	let upper = end;
	while (mid <= upper) {
		if (arr[mid] < pivot) {
			swap(arr, mid, lower);
			mid++;
			lower++;
		} else if (arr[mid] > pivot) {
			swap(arr, mid, upper);
			upper--;
		} else {
			mid++;
		}
	}

	return mid - 1;
}

function swap(arr: number[], i: number, j: number) {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
