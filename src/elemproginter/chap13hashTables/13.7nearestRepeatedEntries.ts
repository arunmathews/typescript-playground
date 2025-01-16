export function nearestRepeatedEntry(
	words: Array<string>,
): [string, number] | undefined {
	const map = new Map<string, Array<number>>();
	words.forEach((v, i) => {
		const currentArray = map.get(v) || [];
		currentArray.push(i);
		map.set(v, currentArray);
	});
	let minDist = Infinity;
	let word: string | undefined;
	map.forEach((v, k) => {
		if (v.length > 1) {
			for (let i = 1; i < v.length; i++) {
				const length = v[i] - v[i - 1];
				if (length < minDist) {
					minDist = length;
					word = k;
				}
			}
		}
	});

	if (word != null) {
		return [word, minDist];
	}

	return undefined;
}
