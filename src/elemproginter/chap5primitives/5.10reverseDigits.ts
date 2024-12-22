export function reverseDigits(x: number): number {
	let result = 0;
	const isNegative = x < 0;
	x = Math.abs(x);
	while (x) {
		result = result * 10 + (x % 10);
		x = Math.floor(x / 10);
	}
	if (isNegative) {
		result = -result;
	}

	return result;
}
