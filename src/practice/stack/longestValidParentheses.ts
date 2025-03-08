export function longestValidParentheses(s: string): number {
	let maxLen = 0;
	const stack: Array<number> = [-1];
	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		if (char === "(") {
			stack.push(i);
		} else {
			stack.pop();
			if (stack.length === 0) {
				stack.push(i);
			} else {
				maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
			}
		}
	}

	return maxLen;
}
