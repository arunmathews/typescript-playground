export function isValid(s: string): boolean {
	const stack: Array<string> = [];
	const map: Map<string, string> = new Map([
		["}", "{"],
		[")", "("],
		["]", "["],
	]);
	const values = new Set(map.values());
	for (const char of s) {
		if (values.has(char)) {
			stack.push(char);
		} else if (map.has(char)) {
			if (stack.length === 0) {
				return false;
			}
			const prefix = stack.pop();
			if (prefix !== map.get(char)) {
				return false;
			}
		}
	}

	return stack.length === 0;
}
