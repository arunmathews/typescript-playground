export function largestRectangleArea(heights: number[]): number {
	let maxArea = 0;
	let stack: Array<number> = [];
	let i = 0;
	while (i < heights.length) {
		if (stack.length === 0 || heights[i] > heights[stack[stack.length - 1]]) {
			stack.push(i);
			i++;
		} else {
			const top = stack.pop()!;
			const right = i - 1;
			const left = stack[stack.length - 1] || -1;
			const area = (right - left) * heights[top];
			maxArea = Math.max(area, maxArea);
		}
	}
	while (stack.length > 0) {
		const top = stack.pop()!;
		const width = stack.length > 0 ? i - stack[stack.length - 1] - 1 : i;
		const area = heights[top] * width;
		maxArea = Math.max(area, maxArea);
	}

	return maxArea;
}
