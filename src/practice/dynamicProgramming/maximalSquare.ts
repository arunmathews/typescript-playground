export function maximalSquare(matrix: string[][]): number {
	if (matrix.length === 0 || matrix[0].length === 0) {
		return 0;
	}
	const rows = matrix.length;
	const cols = matrix[0].length;
	const dp: number[][] = Array(rows + 1)
		.fill(0)
		.map(() => Array(cols + 1).fill(0));
	let maxSide = 0;
	for (let i = 1; i < dp.length; i++) {
		for (let j = 1; j < dp[i].length; j++) {
			if (matrix[i - 1][j - 1] === "1") {
				dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
				maxSide = Math.max(maxSide, dp[i][j]);
			}
		}
	}

	return maxSide * maxSide;
}
