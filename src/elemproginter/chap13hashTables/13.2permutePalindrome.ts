export function permutePalindrome(word: string): boolean {
	const letterMap = new Map<string, number>();
	Array.from(word).forEach((c) => {
		const currentCount = letterMap.get(c) || 0;
		letterMap.set(c, currentCount + 1);
	});

	let oddChars = 0;
	letterMap.forEach((v, k) => {
		if (v % 2 === 1) {
			oddChars = oddChars + 1;
		}
	});
	if (oddChars > 1) {
		return false;
	}

	return true;
}
