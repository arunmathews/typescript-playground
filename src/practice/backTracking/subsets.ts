export function subsets(nums: number[]): number[][] {
	if (nums.length === 0) {
		return [[]];
	}
	const rest = nums.slice(1);
	const restSubsets = subsets(rest);
	const first = nums[0];

	return [...restSubsets, ...restSubsets.map((rs) => [first, ...rs])];
}
