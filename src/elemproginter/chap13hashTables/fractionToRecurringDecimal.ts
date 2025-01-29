export function fractionToDecimal(
	numerator: number,
	denominator: number,
): string {
	if (numerator === 0) {
		return "0";
	}
	if (denominator === 0) {
		return "NaN";
	}
	let sign = "";
	if (Math.sign(numerator) !== Math.sign(denominator)) {
		sign = "-";
	}
	let res = sign;
	const absNum = Math.abs(numerator);
	const absDenom = Math.abs(denominator);
	const quot = Math.floor(absNum / absDenom);
	res = res + quot;
	let remainder = absNum % absDenom;
	if (remainder === 0) {
		return res;
	}
	res = res + ".";
	const remainderMap = new Map<number, number>();
	while (remainder !== 0) {
		if (remainderMap.has(remainder)) {
			const start = remainderMap.get(remainder);
			res = res.slice(0, start) + "(" + res.slice(start) + ")";
			return res;
		}
		remainderMap.set(remainder, res.length);
		remainder = remainder * 10;
		const quot = Math.floor(remainder / absDenom);
		res = res + quot;
		remainder = remainder % absDenom;
	}

	return res;
}

function nextGreaterElement(nums1: Array<number>, nums2: Array<number>) {
	const map = new Map();
	const set = new Set<number>();
	for (let i = 0; i < nums2.length; i++) {
		const num = nums2[i];
		set.add(num);
		Array.from(set.entries()).forEach((setVal) => {
			if (num > setVal[0]) {
				set.delete(num);
				map.set(setVal[0], num);
			}
		});
	}
	console.log(`map - ${Array.from(map)}`);
	const res = [];
	for (const num of nums1) {
		const maybeHigher = map.get(num);
		if (maybeHigher == null) {
			res.push(-1);
		} else {
			res.push(maybeHigher);
		}
	}
	return res;
}
