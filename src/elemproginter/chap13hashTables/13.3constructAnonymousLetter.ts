export function constructAnonymousLetter(
	letter: string,
	book: string,
): boolean {
	const wordsInLetter = letter.split(" ");
	const letterMap = new Map<string, number>();
	wordsInLetter.forEach((word) => {
		const currentCount = letterMap.get(word) || 0;
		letterMap.set(word, currentCount + 1);
	});
	const wordsInBook = book.split(" ");
	let bookIndex = 0;
	while (letterMap.size > 0 && bookIndex < wordsInBook.length) {
		const nextWord = wordsInBook[bookIndex];
		const nextWordCount = letterMap.get(nextWord);
		if (nextWordCount != null) {
			const newNextWordCount = nextWordCount - 1;
			if (newNextWordCount === 0) {
				letterMap.delete(nextWord);
			} else {
				letterMap.set(nextWord, newNextWordCount);
			}
		}
		bookIndex++;
	}

	if (letterMap.size === 0) {
		return true;
	} else {
		return false;
	}
}
