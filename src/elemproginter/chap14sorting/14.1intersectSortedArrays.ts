export function intersectSortedArrays(
	a: Array<number>,
	b: Array<number>,
): Array<number> {
	const res = [];

	let ai = 0;
	let bi = 0;
	while (ai < a.length && bi < b.length) {
		if (a[ai] === b[bi]) {
			if (res[res.length - 1] != a[ai]) {
				res.push(a[ai]);
			}
			ai++;
			bi++;
			continue;
		}
		if (a[ai] < b[bi]) {
			ai++;
			continue;
		}
		if (a[ai] > b[bi]) {
			bi++;
			continue;
		}
	}

	return res;
}
