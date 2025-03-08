export function countBits(n: number): number[] {
	const dp = Array(n + 1).fill(0);

	dp[1] = 1;
	for (let i = 2; i < dp.length; i++) {
		dp[i] = dp[Math.floor(i / 2)] + (i % 2);
	}

	return dp;
}
