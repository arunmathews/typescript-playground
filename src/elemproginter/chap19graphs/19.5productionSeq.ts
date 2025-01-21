type BFSQueueItem = {
	current: string;
	path: Array<string>;
};

export function productionSequence(
	start: string,
	end: string,
	dict: Set<string>,
): Array<String> | undefined {
	if (start.length !== end.length) {
		return undefined;
	}
	const queue = new Array<BFSQueueItem>();
	queue.push({ current: start, path: [start] });
	const visited = new Set<string>();
	while (queue.length > 0) {
		const nextItem = queue.shift()!;
		if (nextItem.current === end) {
			return nextItem.path;
		}
		visited.add(nextItem.current);
		const neighbors = findNeighbors(dict, nextItem, visited);
		queue.push(...neighbors);
	}

	return undefined;
}

function findNeighbors(
	dict: Set<string>,
	item: BFSQueueItem,
	visited: Set<string>,
): Array<BFSQueueItem> {
	let maybeNeighbors = new Array<BFSQueueItem>();
	for (let i = 0; i < item.current.length; i++) {
		for (let j = 0; j < 26; j++) {
			const currentCharArray = Array.from(item.current);
			currentCharArray[i] = String.fromCharCode("a".codePointAt(0)! + j);
			const maybeNeighbor = currentCharArray.join("");
			if (!visited.has(maybeNeighbor) && dict.has(maybeNeighbor)) {
				maybeNeighbors.push({
					current: maybeNeighbor,
					path: [...item.path, maybeNeighbor],
				});
			}
		}
	}

	return maybeNeighbors;
}
