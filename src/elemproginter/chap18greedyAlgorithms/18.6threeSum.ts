export function threeSum(
	nums: Array<number>,
	sum: number,
): Array<number> | undefined {
	nums.sort((a, b) => a - b);

	for (let i = 0; i < nums.length - 2; i++) {
		let left = i + 1;
		let right = nums.length - 1;
		while (left < right) {
			const tempSum = nums[i] + nums[left] + nums[right];
			if (tempSum === sum) {
				return [nums[i], nums[left], nums[right]];
			}
			if (tempSum > sum) {
				right--;
			} else {
				left++;
			}
		}
	}

	return undefined;
}
