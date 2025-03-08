export function wordBreak(s: string, wordDict: string[]): boolean {
	const wordSet = new Set(wordDict);
	const map: Map<string, boolean> = new Map();

	function memoize(subS: string): boolean {
		if (subS.length === 0) {
			return true;
		}
		if (map.has(subS)) {
			return map.get(subS)!;
		}
		if (wordSet.has(subS)) {
			map.set(subS, true);
			return true;
		}
		for (let i = 0; i < subS.length; i++) {
			const first = subS.slice(0, i);
			const rest = subS.slice(i);
			if (memoize(first) && memoize(rest)) {
				map.set(subS, true);
				return true;
			}
		}

		map.set(subS, false);

		return false;
	}

	return memoize(s);
}

export function bottomUpWorkBreak(s: string, wordDict: string[]): boolean {
	const wordSet = new Set(wordDict);
	const dp: Array<boolean> = Array(s.length + 1).fill(false);
	dp[0] = true;
	for (let i = 1; i < dp.length; i++) {
		for (let j = 0; j < i; j++) {
			if (dp[j] && wordSet.has(s.slice(j, i))) {
				dp[i] = true;
				break;
			}
		}
	}

	return dp[s.length];
}
