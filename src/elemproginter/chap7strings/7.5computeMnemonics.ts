const phoneDialerMap: Map<number, string[]> = new Map([
	[2, ["a", "b", "c"]],
	[3, ["d", "e", "f"]],
	[4, ["g", "h", "i"]],
	[5, ["j", "k", "l"]],
	[6, ["m", "n", "o"]],
	[7, ["p", "q", "r", "s"]],
	[8, ["t", "u", "v"]],
	[9, ["w", "x", "y", "z"]],
	[0, [" "]], // 0 often maps to space
	[1, []], // 1 has no associated letters on most keypads
]);

export function computeMnemonics(n: string): Set<string> {
	if (n.length === 0) {
		return new Set();
	}
	if (n.length === 1) {
		return computeForFirstChar(n);
	}

	const rest = computeMnemonics(n.substring(1));
	const first = computeForFirstChar(n);
	const finalSet = new Set<string>();
	if (first.size === 0) {
		return rest;
	}
	if (rest.size === 0) {
		return first;
	}

	rest.forEach((r) => {
		first.forEach((f) => {
			console.log(`${f}${r}`);
			finalSet.add(`${f}${r}`);
		});
	});

	return finalSet;
}

function computeForFirstChar(n: string): Set<string> {
	const num = n.charCodeAt(0) - "0".charCodeAt(0);
	if (num < 0 || num > 9) {
		throw new Error("Invalid input");
	}
	const charSet = phoneDialerMap.get(num);
	if (charSet === undefined) {
		throw new Error("should not happen");
	}
	return new Set(charSet);
}
