export function isValidTree(nodeCount: number, edgeArr: Array<Array<number>>) {
	if (edgeArr.length !== nodeCount - 1) {
		return false;
	}
	const edges = edgeArr.map((e) => ({
		origin: e[0],
		dest: e[1],
	}));

	const adjList: Map<number, Set<number>> = new Map();
	for (let i = 0; i < nodeCount; i++) {
		adjList.set(i, new Set());
	}

	for (const edge of edges) {
		adjList.get(edge.origin)?.add(edge.dest);
		adjList.get(edge.dest)?.add(edge.origin);
	}

	const visited: Set<number> = new Set();
	return dfsHelper(0, -1, adjList, visited) && visited.size === nodeCount;
}

function dfsHelper(
	node: number,
	parent: number,
	graph: Map<number, Set<number>>,
	visited: Set<number>,
): boolean {
	if (visited.has(node)) {
		return false;
	}
	visited.add(node);
	if (graph.has(node)) {
		const neighbors = graph.get(node)!;
		for (const neighbor of neighbors) {
			if (neighbor === parent) {
				continue;
			}
			if (!dfsHelper(neighbor, node, graph, visited)) {
				return false;
			}
		}

		return true;
	} else {
		return true;
	}
}
