type StackItem = {
	str: string;
	count: number;
};

export function decodeString(s: string): string {
	let currentNumber = 0;
	let currentStr = "";
	const stack: Array<StackItem> = [];
	for (const char of s) {
		if (Number.isInteger(parseInt(char))) {
			currentNumber = currentNumber * 10 + parseInt(char);
		} else if (char === "[") {
			stack.push({ str: currentStr, count: currentNumber });
			currentNumber = 0;
			currentStr = "";
		} else if (char === "]") {
			const { str, count } = stack.pop()!;
			currentStr = str + currentStr.repeat(count);
		} else {
			currentStr = `${currentStr}${char}`;
		}
	}

	return currentStr;
}
