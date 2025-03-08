export function generateParenthesis(n: number): string[] {
	let result: Array<string> = [];

	function backTrack(s: string, open: number, close: number) {
		if (s.length === 2 * n) {
			result.push(s);
			return;
		}
		if (open < n) {
			backTrack(s + "(", open + 1, close);
		}
		if (close < open) {
			backTrack(s + ")", open, close + 1);
		}
	}

	backTrack("", 0, 0);

	return result;
}
