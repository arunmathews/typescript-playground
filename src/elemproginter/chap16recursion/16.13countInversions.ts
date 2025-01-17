export function countInversions(nums: Array<number>): number {
	return countInversionsHelper(nums)[1];
}

function countInversionsHelper(nums: Array<number>): [Array<number>, number] {
	if (nums.length === 0) {
		return [nums, 0];
	}
	if (nums.length === 1) {
		return [nums, 0];
	}
	const mid = Math.floor(nums.length / 2);
	const left = nums.slice(0, mid);
	const right = nums.slice(mid);
	const [leftMerged, leftInversions] = countInversionsHelper(left);
	const [rightMerged, rightInversions] = countInversionsHelper(right);

	const [finalMerged, mergeInversions] = mergeAndCountInversions(
		leftMerged,
		rightMerged,
	);

	return [finalMerged, leftInversions + rightInversions + mergeInversions];
}

function mergeAndCountInversions(
	left: Array<number>,
	right: Array<number>,
): [Array<number>, number] {
	if (left.length === 0) {
		return [right, 0];
	}
	if (right.length === 0) {
		return [left, 0];
	}
	const left1st = left[0];
	const right1st = right[0];
	if (left1st > right1st) {
		const rightRest = right.slice(1);
		const [restMerged, restInversions] = mergeAndCountInversions(
			left,
			rightRest,
		);

		restMerged.unshift(right1st);
		return [restMerged, restInversions + left.length];
	} else {
		const leftRest = left.slice(1);
		const [restMerged, restInversions] = mergeAndCountInversions(
			leftRest,
			right,
		);
		restMerged.unshift(left1st);
		return [restMerged, restInversions];
	}
}
