const parityMap = new Map<number, boolean>();
for (let i = 0; i < 2 ** 16; i++) {
	parityMap.set(i, computeParity(i));
}

export function parity(x: bigint): boolean {
	const maskSize = 16;
	const mask = 0xffff;
	let result = parityMap.get(Number(x & BigInt(mask)));
	if (result === undefined) {
		result = computeParity(Number(x & BigInt(mask)));
	}
	x = x >> BigInt(maskSize);
	while (x) {
		result = result !== parityMap.get(Number(x & BigInt(mask)));
		x = x >> BigInt(maskSize);
	}

	return result;
}

function computeParity(x: number): boolean {
	let oneBits = 0;
	while (x) {
		const y = x & ~(x - 1);
		if (y) {
			oneBits++;
		}
		x = x ^ y;
	}

	return oneBits % 2 === 1;
}
