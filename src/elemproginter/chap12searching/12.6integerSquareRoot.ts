export function computeIntegerSquareRoot(n: number): number {
	let lower = 0;
	let upper = n;
	let res = 0;
	while (lower <= upper) {
		const mid = lower + Math.floor((upper - lower) / 2);
		const square = mid * mid;
		if (square === n) {
			return mid;
		} else if (square > n) {
			upper = mid - 1;
		} else {
			res = mid;
			lower = mid + 1;
		}
	}

	return res;
}
