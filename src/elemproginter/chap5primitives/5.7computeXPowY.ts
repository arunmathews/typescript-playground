export function computeXPowY(x: bigint, y: number): bigint {
	let result = BigInt(1);
	let base = x;
	while (y) {
		if (y & 1) {
			result = result * base;
			base = base * base;
			y = y >> 1;
		}
	}

	return result;
}
