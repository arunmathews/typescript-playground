export function majorityElement<T>(stream: Array<T>): T | undefined {
	let majEl: T | undefined = undefined;
	let count = 0;
	for (const el of stream) {
		if (majEl == null) {
			majEl = el;
			count = 1;
		} else {
			if (majEl === el) {
				count++;
			} else {
				count--;
			}
		}
		if (count === 0) {
			majEl = undefined;
		}
	}

	return majEl;
}
