export function visiblePoints(
	arrPoints: number[][],
	angle: number,
	locationArr: number[],
): number {
	const points = arrPoints.map((p) => ({
		x: p[0],
		y: p[1],
	}));

	const location = {
		x: locationArr[0],
		y: locationArr[1],
	};

	let samePosCount = 0;
	let angles: Array<number> = [];
	for (const point of points) {
		if (point.x === location.x && point.y === location.y) {
			samePosCount++;
			continue;
		}
		const angle =
			Math.atan2(point.y - location.y, point.x - location.x) * (180 / Math.PI);
		angles.push(angle);
	}

	angles.sort((a, b) => a - b);

	const plus360Angles = [...angles, ...angles.map((a) => a + 360)];

	let maxVisible = 0;
	let left = 0;
	for (let right = 0; right < plus360Angles.length; right++) {
		while (plus360Angles[right] - plus360Angles[left] > angle) {
			left++;
		}
		maxVisible = Math.max(maxVisible, right - left + 1);
	}

	return maxVisible + samePosCount;
}
