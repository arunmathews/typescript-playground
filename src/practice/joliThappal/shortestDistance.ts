export function shortestDistance(
	wordsDict: string[],
	word1: string,
	word2: string,
): number {
	let word1Pos = -1;
	let word2Pos = -1;
	let minDist = Infinity;
	for (let i = 0; i < wordsDict.length; i++) {
		if (wordsDict[i] === word1 || wordsDict[i] === word2) {
			if (wordsDict[i] === word1) {
				word1Pos = i;
			} else {
				word2Pos = i;
			}
			minDist = calcMinDist(word1Pos, word2Pos, minDist);
		}
	}

	return minDist;
}

function calcMinDist(
	word1Pos: number,
	word2Pos: number,
	minDist: number,
): number {
	if (word1Pos === -1 || word2Pos === -1) {
		return minDist;
	}

	const currentDist = Math.abs(word1Pos - word2Pos);
	return Math.min(minDist, currentDist);
}
