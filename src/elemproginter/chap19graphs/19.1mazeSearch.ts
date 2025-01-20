type GraphPos = {
	row: number;
	col: number;
};

export function mazeSearch(
	graph: Array<Array<number>>,
	start: GraphPos,
	end: GraphPos,
): Array<GraphPos> {
	const path = new Array<GraphPos>();
	return dfsSearchHelper(graph, start, end, path, new Set());
}

function dfsSearchHelper(
	graph: Array<Array<number>>,
	start: GraphPos,
	end: GraphPos,
	path: Array<GraphPos>,
	visited: Set<string>,
): Array<GraphPos> {
	path.push(start);
	if (start.col === end.col && start.row === end.row) {
		return path;
	}
	visited.add(JSON.stringify(start));
	const neighbors = [
		{ row: start.row + 1, col: start.col },
		{ row: start.row - 1, col: start.col },
		{ row: start.row, col: start.col - 1 },
		{ row: start.row, col: start.col + 1 },
	];
	for (const neighbor of neighbors) {
		if (
			neighbor.row < graph.length &&
			neighbor.row >= 0 &&
			neighbor.col < graph[0].length &&
			neighbor.col >= 0 &&
			graph[neighbor.row][neighbor.col] === 0 &&
			!visited.has(JSON.stringify(neighbor))
		) {
			const res = dfsSearchHelper(graph, neighbor, end, path, visited);
			if (res.length > 0) {
				const last = res[res.length - 1];
				if (last.col === end.col && last.row === end.row) {
					return res;
				}
			}
		}
	}
	path.pop();

	return path;
}
