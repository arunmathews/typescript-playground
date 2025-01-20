export class Graph {
	private adjacencyList: Map<string, Set<string>> = new Map();

	constructor(private isDirected: boolean) {}
	addVertex(vertex: string): void {
		if (this.adjacencyList.get(vertex) == null) {
			this.adjacencyList.set(vertex, new Set());
		}
	}

	addEdge(v1: string, v2: string): void {
		if (!this.adjacencyList.has(v1)) {
			this.addVertex(v1);
		}
		const edges = this.adjacencyList.get(v1);
		if (edges != null) {
			edges.add(v2);
		}
		if (!this.isDirected) {
			if (!this.adjacencyList.has(v2)) {
				this.addVertex(v2);
			}
			this.adjacencyList.get(v2)?.add(v1);
		}
	}

	display(): void {
		this.adjacencyList.forEach((al, v) =>
			console.log(`${v} -> ${Array.from(al)}`),
		);
	}

	removeEdge(v1: string, v2: string): void {
		if (this.adjacencyList.has(v1)) {
			this.adjacencyList.get(v1)?.delete(v2);
		}
		if (!this.isDirected) {
			if (this.adjacencyList.has(v2)) {
				this.adjacencyList.get(v2)?.delete(v1);
			}
		}
	}

	removeVertex(v: string): void {
		if (this.adjacencyList.has(v)) {
			this.adjacencyList.delete(v);
		}
		if (!this.isDirected) {
			this.adjacencyList.forEach((al) => al.delete(v));
		}
	}

	getNeighbors(v: string): Set<string> | undefined {
		if (this.adjacencyList.get(v) != null) {
			return new Set(this.adjacencyList.get(v));
		}

		return undefined;
	}
}

export function dfsSearch(graph: Graph, start: string): Array<string> {
	const dfsResult = new Array<string>();
	dfsSearchHelper(graph, new Set(), start, dfsResult);

	return dfsResult;
}

function dfsSearchHelper(
	graph: Graph,
	visited: Set<string>,
	start: string,
	dfs: Array<string>,
): void {
	visited.add(start);
	dfs.push(start);
	const maybeNeighbors = graph.getNeighbors(start);
	if (maybeNeighbors != null) {
		for (const neighbor of maybeNeighbors) {
			if (!visited.has(neighbor)) {
				dfsSearchHelper(graph, visited, neighbor, dfs);
			}
		}
	}
}

export function bfsSearch(graph: Graph, start: string): Array<string> {
	const visited = new Set<string>();
	const queue = new Array<string>();
	const bfsRes = new Array<string>();
	queue.push(start);
	visited.add(start);
	while (queue.length > 0) {
		const currNode = queue.shift();
		if (currNode != null) {
			bfsRes.push(currNode);
			const maybeNeighbors = graph.getNeighbors(currNode);
			if (maybeNeighbors != null) {
				for (const neighbor of maybeNeighbors) {
					if (!visited.has(neighbor)) {
						visited.add(neighbor);
						queue.push(neighbor);
					}
				}
			}
		}
	}

	return bfsRes;
}
