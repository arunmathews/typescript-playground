export class GraphNode<T> {
	value: T;
	neighbors: Array<GraphNode<T>>;

	constructor(value: T) {
		this.value = value;
		this.neighbors = [];
	}

	addNeighbor(node: GraphNode<T>) {
		this.neighbors.push(node);
	}
}

export function copyGraph<T>(node: GraphNode<T>): Map<T, Set<T>> {
	const adjList = new Map();
	const visited = new Set();
	copyGraphHelper(node, adjList, visited);

	return adjList;
}

function copyGraphHelper<T>(
	node: GraphNode<T>,
	adjList: Map<T, Set<T>>,
	visited: Set<T>,
) {
	if (visited.has(node.value)) {
		return;
	}
	visited.add(node.value);
	if (!adjList.has(node.value)) {
		adjList.set(node.value, new Set());
	}
	for (const neighbor of node.neighbors) {
		const currSet = adjList.get(node.value)!;
		currSet.add(neighbor.value);
		if (!visited.has(neighbor.value)) {
			copyGraphHelper(neighbor, adjList, visited);
		}
	}
}
