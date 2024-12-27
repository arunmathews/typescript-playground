export function dutchNationalFlag(arr: number[], index: number): void {
	if (index < 0 || index > arr.length - 1) {
		throw new Error("Index is out of bounds");
	}

	let smallerPivotInd = index;
	let higherPivotInd = index;
	const pivot = arr[index];
	let smaller = 0;
	while (smaller < smallerPivotInd) {
		if (arr[smaller] > pivot) {
			swapEntries(arr, smaller, higherPivotInd);
			swapEntries(arr, smaller, smallerPivotInd - 1);
			smallerPivotInd--;
			higherPivotInd--;
			continue;
		}
		if (arr[smaller] === pivot) {
			swapEntries(arr, smaller, smallerPivotInd - 1);
			smallerPivotInd--;
			continue;
		}
		smaller++;
	}
	let higher = arr.length - 1;
	while (higher > higherPivotInd) {
		if (arr[higher] < pivot) {
			swapEntries(arr, higher, smallerPivotInd);
			swapEntries(arr, higher, higherPivotInd + 1);
			higherPivotInd++;
			smallerPivotInd++;
			continue;
		}
		if (arr[higher] === pivot) {
			swapEntries(arr, higher, higherPivotInd + 1);
			higherPivotInd++;
			continue;
		}
		higher--;
	}
	console.log(`final array - ${arr}`);
}

export function dutchNationalFlag2(arr: number[], index: number): void {
	if (index < 0 || index > arr.length - 1) {
		throw new Error("Index is out of bounds");
	}

	let low = 0;
	let mid = 0;
	let high = arr.length - 1;
	const pivot = arr[index];

	while (mid <= high) {
		if (arr[mid] < pivot) {
			swapEntries(arr, low++, mid++);
		} else if (arr[mid] > pivot) {
			swapEntries(arr, mid, high--);
		} else {
			mid++;
		}
	}
	console.log(`final array - ${arr}`);
}

function swapEntries(arr: number[], ind1: number, ind2: number): void {
	const temp = arr[ind1];
	arr[ind1] = arr[ind2];
	arr[ind2] = temp;
}
