export function combinationSum(
	candidates: number[],
	target: number,
): number[][] {
	const result: number[][] = [];

	function backTrack(startIdx: number, target: number, current: number[]) {
		if (target === 0) {
			result.push([...current]);
			return;
		}
		if (target < 0) {
			return;
		}
		for (let i = startIdx; i < candidates.length; i++) {
			current.push(candidates[i]);
			backTrack(startIdx, target - candidates[i], current);
			current.pop();
		}
	}

	backTrack(0, target, []);

	return result;
}
