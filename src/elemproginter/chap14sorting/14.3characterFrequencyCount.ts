export function characterFrequencyCount(s: string): Array<[string, number]> {
	const charArray = Array.from(s.toLowerCase()).sort();
	const outArray: Array<[string, number]> = [];
	let prevChar: string | undefined = undefined;
	let charCount = 0;
	for (let i = 0; i < charArray.length; i++) {
		const currentChar = charArray[i];
		if (currentChar.trim() === "") {
			continue;
		}
		if (currentChar !== prevChar) {
			if (prevChar !== undefined) {
				outArray.push([prevChar, charCount]);
			}
			prevChar = currentChar;
			charCount = 1;
		} else {
			charCount++;
		}
	}

	return outArray;
}
