export function calculate(s: string): number {
	let currentNumber = 0;
	let sign = 1;
	let stack: Array<number> = [];
	let result = 0;
	for (const char of s) {
		if (char >= "0" && char <= "9") {
			currentNumber = currentNumber * 10 + Number.parseInt(char);
		} else if (char === "+") {
			result = result + currentNumber;
			sign = 1;
			currentNumber = 0;
		} else if (char === "-") {
			result = result + currentNumber;
			sign = -1;
			currentNumber = 0;
		} else if (char === "(") {
			stack.push(result);
			stack.push(sign);
			result = 0;
			sign = 1;
		} else if (char === ")") {
			result = result + sign * currentNumber;
			currentNumber = 0;
			result = result * stack.pop()!;
			result = result + stack.pop()!;
		}
	}
	result = result + sign * currentNumber;

	return result;
}
