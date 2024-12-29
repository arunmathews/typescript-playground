export function stringToInt(s: string): number {
	if (s.length === 0) {
		throw new Error("invalid input");
	}
	let isNegative = false;
	let start = 0;
	if (s.charAt(0) === "-") {
		isNegative = true;
		start = 1;
	}

	let finalNum = 0;
	for (let i = start; i < s.length; i++) {
		const numValue = s.charCodeAt(i) - "0".charCodeAt(0);
		if (numValue > 9 || numValue < 0) {
			throw new Error("Invalid character");
		}

		finalNum = finalNum * 10 + numValue;
	}

	return isNegative ? -1 * finalNum : finalNum;
}

export function intToString(n: number): string {
	const prepend = n < 0 ? "-" : "";
	let absN = Math.abs(n);
	let result = "";
	while (absN > 0) {
		const nextDig = absN % 10;
		result = nextDig + result;
		absN = Math.floor(absN / 10);
	}

	return prepend + result;
}
