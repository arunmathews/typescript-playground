export function groupAnagrams(strs: string[]): string[][] {
	const anaMap: Map<string, Array<string>> = new Map();
	for (const str of strs) {
		const sorted = Array.from(str).sort().join("");
		const anas = anaMap.get(sorted) || [];
		anas.push(str);
		anaMap.set(sorted, anas);
	}

	return Array.from(anaMap.entries()).map(([k, v]) => v);
}
