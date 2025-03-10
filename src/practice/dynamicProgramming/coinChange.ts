function coinChange(coins: number[], amount: number): number {
	const dp = Array(amount + 1).fill(Infinity);

	dp[0] = 0;
	for (let i = 1; i < dp.length; i++) {
		for (const coin of coins) {
			if (i >= coin) {
				dp[i] = Math.min(dp[i], dp[i - coin] + 1);
			}
		}
	}

	return dp[amount] === Infinity ? -1 : dp[amount];
}
