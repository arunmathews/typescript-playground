export function randomSubset(arr: number[], k: number): void {
	if (k > arr.length) {
		throw new Error("k has to be less than or equal to the size of array");
	}

	for (let i = 0; i < k; i++) {
		const randomInd = Math.floor(Math.random() * arr.length - i);
		swapEntries(arr, randomInd, arr.length - i);
	}
}

export function randomSubset2(arr: number[], k: number): number[] {
	if (k > arr.length) {
		throw new Error("k has to be less than or equal to the size of array");
	}

	const subsetArr = new Array<number>();
	for (let i = 0; i < k; i++) {
		const randomInd = Math.floor(Math.random() * arr.length - i);
		subsetArr.push(arr[randomInd]);
		swapEntries(arr, randomInd, arr.length - 1);
	}

	return subsetArr;
}

function swapEntries(arr: number[], ind1: number, ind2: number): void {
	const temp = arr[ind1];
	arr[ind1] = arr[ind2];
	arr[ind2] = temp;
}
