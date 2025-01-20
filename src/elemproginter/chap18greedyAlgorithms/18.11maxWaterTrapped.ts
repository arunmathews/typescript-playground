type TrapPos = {
	left: number;
	right: number;
};

export function maxWaterTrapped(heights: Array<number>): number | undefined {
	const maybeMaxPos = maxWaterTrappedHelper(
		{ left: 0, right: heights.length - 1 },
		undefined,
		0,
		heights,
	);

	if (maybeMaxPos != null) {
		console.log(`Max position - ${JSON.stringify(maybeMaxPos)}`);
		return (
			Math.min(heights[maybeMaxPos.left], heights[maybeMaxPos.right]) *
			(maybeMaxPos.right - maybeMaxPos.left)
		);
	} else {
		console.log(`No max position found`);
		return undefined;
	}
}

function maxWaterTrappedHelper(
	currentPos: TrapPos,
	maybeMaxPos: TrapPos | undefined,
	maxVol: number,
	heights: Array<number>,
): TrapPos | undefined {
	if (currentPos.left === currentPos.right) {
		return maybeMaxPos;
	}
	const leftHeight = heights[currentPos.left];
	const rightHeight = heights[currentPos.right];
	const newVol =
		Math.min(leftHeight, rightHeight) * (currentPos.right - currentPos.left);
	let newMaxVol = maxVol;
	let newMaxPos: TrapPos | undefined = maybeMaxPos;
	if (newVol > maxVol) {
		newMaxVol = newVol;
		newMaxPos = { left: currentPos.left, right: currentPos.right };
	}
	if (leftHeight > rightHeight) {
		return maxWaterTrappedHelper(
			{ left: currentPos.left, right: currentPos.right - 1 },
			newMaxPos,
			newMaxVol,
			heights,
		);
	} else if (rightHeight > leftHeight) {
		return maxWaterTrappedHelper(
			{ left: currentPos.left + 1, right: currentPos.right },
			newMaxPos,
			newMaxVol,
			heights,
		);
	} else {
		return maxWaterTrappedHelper(
			{ left: currentPos.left + 1, right: currentPos.right - 1 },
			newMaxPos,
			newMaxVol,
			heights,
		);
	}
}
