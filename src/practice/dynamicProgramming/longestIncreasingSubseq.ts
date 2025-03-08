export function lengthOfLIS(nums: number[]): number {
	if (nums.length === 0) {
		return 0;
	}
	const dp = Array(nums.length).fill(1);
	let maxLength = 1;
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[j] < nums[i]) {
				dp[i] = Math.max(dp[i], dp[j] + 1);
			}
		}
		maxLength = Math.max(maxLength, dp[i]);
	}

	return maxLength;
}
