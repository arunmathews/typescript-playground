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
}
