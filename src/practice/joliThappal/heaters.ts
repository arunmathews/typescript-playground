export function findRadius(houses: number[], heaters: number[]): number {
	houses.sort((a, b) => a - b);
	heaters.sort((a, b) => a - b);
	let maxRadius = 0;
	for (const house of houses) {
		const closestDistance = findClosestHeaterDist(house, heaters);
		maxRadius = Math.max(maxRadius, closestDistance);
	}

	return maxRadius;
}

function findClosestHeaterDist(housePos: number, heaters: number[]): number {
	let left = 0;
	let right = heaters.length - 1;
	while (left < right) {
		const mid = Math.floor(left + (right - left) / 2);
		if (heaters[mid] < housePos) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}
	let closestDistance = heaters[left] - housePos;
	if (left > 0) {
		closestDistance = Math.min(closestDistance, housePos - heaters[left - 1]);
	}

	return closestDistance;
}
