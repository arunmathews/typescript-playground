export function gasUp(gas: number[], cost: number[]): number | undefined {
	let totalGas = 0;
	let currentGas = 0;
	let startStation = 0;
	for (let i = 0; i < gas.length; i++) {
		currentGas = currentGas + gas[i] - cost[i];
		totalGas = totalGas + gas[i] - cost[i];
		if (currentGas < 0) {
			startStation = i + 1;
			currentGas = 0;
		}
	}
	if (totalGas < 0) {
		return undefined;
	}

	return startStation;
}
