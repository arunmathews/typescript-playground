export function dailyTemperatures(temperatures: number[]): number[] {
	const res: number[] = Array(temperatures.length).fill(0);
	const stack: number[] = [];
	for (let i = 0; i < temperatures.length; i++) {
		while (stack.length > 0) {
			const currTemp = temperatures[i];
			if (temperatures[stack[stack.length - 1]] < currTemp) {
				const lowerIdx = stack.pop()!;
				res[lowerIdx] = i - lowerIdx;
			} else {
				break;
			}
		}
		stack.push(i);
	}

	return res;
}
