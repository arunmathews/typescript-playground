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

type BFSQueueItem = {
	pos: GraphPos;
	path: Array<GraphPos>;
};

export function mazeSearchBFS(
	graph: Array<Array<number>>,
	start: GraphPos,
	end: GraphPos,
): Array<GraphPos> | undefined {
	const queue = new Array<BFSQueueItem>();
	const visited = new Set<string>();
	const startQueueItem = {
		pos: start,
		path: [start],
	};
	queue.push(startQueueItem);
	while (queue.length > 0) {
		const nextItem = queue.shift()!;
		if (nextItem.pos.col === end.col && nextItem.pos.row === end.row) {
			return nextItem.path;
		}
		visited.add(JSON.stringify(nextItem));
		const neighbors = findNeighbors(graph, nextItem, visited);
		queue.push(...neighbors);
	}

	return undefined;
}

function findNeighbors(
	graph: Array<Array<number>>,
	item: BFSQueueItem,
	visited: Set<string>,
): Array<BFSQueueItem> {
	const moves = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];
	const { pos, path } = item;
	const potentialNeighbors = moves.map(([h, v]) => ({
		row: pos.row + h,
		col: pos.col + v,
	}));
	return potentialNeighbors
		.filter((pn) => isValid(graph, pn, visited))
		.map((n) => ({ pos: n, path: [...path, n] }));
}

function isValid(
	graph: Array<Array<number>>,
	pos: GraphPos,
	visited: Set<string>,
): boolean {
	return (
		pos.row < graph.length &&
		pos.row >= 0 &&
		pos.col < graph[0].length &&
		pos.col >= 0 &&
		graph[pos.row][pos.col] === 0 &&
		!visited.has(JSON.stringify(pos))
	);
}
