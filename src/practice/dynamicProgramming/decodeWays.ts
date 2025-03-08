export function numDecodings(s: string): number {
	if (s.length === 0 || s[0] === "0") {
		return 0;
	}
	const dp: number[] = Array(s.length + 1).fill(0);
	dp[0] = 1;
	dp[1] = 1;
	for (let i = 2; i < dp.length; i++) {
		const digitI = Number.parseInt(s[i - 1]);
		if (digitI != 0) {
			dp[i] = dp[i] + dp[i - 1];
		}
		const digits2I = Number.parseInt(s.slice(i - 2, i));
		if (digits2I >= 10 && digits2I <= 26) {
			dp[i] = dp[i] + dp[i - 2];
		}
	}

	return dp[s.length];
}
