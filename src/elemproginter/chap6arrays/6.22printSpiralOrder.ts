export function printSpiralOrder(arr: number[][]): void {
	let startInd = 0;
	let endInd = arr.length - 1;
	while (startInd <= endInd) {
		let fixed = startInd;
		for (let i = startInd; i <= endInd; i++) {
			console.log(arr[fixed][i]);
		}
		fixed = endInd;
		for (let i = startInd + 1; i <= endInd; i++) {
			console.log(arr[i][fixed]);
		}
		for (let i = endInd - 1; i >= startInd; i--) {
			console.log(arr[fixed][i]);
		}
		fixed = startInd;
		for (let i = endInd - 1; i >= startInd + 1; i--) {
			console.log(arr[i][fixed]);
		}
		startInd++;
		endInd--;
	}
}
