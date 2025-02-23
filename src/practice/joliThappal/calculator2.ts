export function calculate2(s: string): number {
	const stack: Array<number> = [];
	let currentNumber = 0;
	let operator = "+";
	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		if (char >= "0" && char <= "9") {
			currentNumber = currentNumber * 10 + Number.parseInt(char);
		} else if (char !== " " || i === s.length - 1) {
			if (operator === "+") {
				stack.push(currentNumber);
			}
			if (operator === "-") {
				stack.push(-currentNumber);
			}
			if (operator === "*") {
				stack[stack.length - 1] = stack[stack.length - 1] * currentNumber;
			}
			if (operator === "/") {
				stack[stack.length - 1] = stack[stack.length - 1] / currentNumber;
			}
			currentNumber = 0;
			operator = char;
		}
	}

	return stack.reduce((acc, num) => acc + num, 0);
}
