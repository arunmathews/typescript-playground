export function minEatingSpeed(piles: number[], h: number): number {
	function timeTaken(rate: number) {
		let time = 0;
		for (const pile of piles) {
			time += Math.ceil(pile / rate);
		}

		return time;
	}

	let left = 1;
	let right = Math.max(...piles);

	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		const hours = timeTaken(mid);
		if (hours <= h) {
			right = mid;
		} else {
			left = mid + 1;
		}
	}

	return left;
}
