export function uniquePaths(m: number, n: number): number {
	if (m === 0 || n === 0) {
		return 0;
	}

	const dp = Array(m)
		.fill(1)
		.map(() => Array(n).fill(0));
	for (let i = 0; i < m; i++) {
		dp[i][n - 1] = 1;
	}
	for (let i = 0; i < n; i++) {
		dp[m - 1][i] = 1;
	}
	for (let i = m - 2; i >= 0; i--) {
		for (let j = n - 2; j >= 0; j--) {
			dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
		}
	}

	return dp[0][0];
}
