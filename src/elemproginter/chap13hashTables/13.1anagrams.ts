export function findAnagrams(dict: Array<string>): Array<Set<string>> {
	const map = new Map<string, Set<string>>();
	dict.forEach((word) => {
		const chars = Array.from(word).sort().join();
		const currentSet = map.get(chars) || new Set<string>();
		currentSet.add(word);
		map.set(chars, currentSet);
	});
	console.log(map);
	return Array.from(map.values()).filter((set) => set.size > 1);
}
