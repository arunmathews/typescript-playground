export function incrementBigInteger(input: number[]): number[] {
	if (input.length === 0) {
		input.push(1);

		return input;
	}
	let carryOver = 0;
	let toAdd = 1;
	for (let i = input.length - 1; i >= 0; i--) {
		const sum = carryOver + toAdd + input[i];
		input[i] = sum % 10;
		toAdd = 0;
		carryOver = Math.floor(sum / 10);
		if (carryOver === 0) {
			break;
		}
	}
	if (carryOver > 0) {
		input.unshift(carryOver);
	}

	return input;
}
