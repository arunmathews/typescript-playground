type Pos = {
	row: number;
	col: number;
};

export function floodFill(
	image: Array<Array<number>>,
	sr: number,
	sc: number,
	color: number,
) {
	const start = {
		row: sr,
		col: sc,
	};
	const visited: Set<string> = new Set();
	const origColor = image[sr][sc];
	floodFillHelper(start, image, visited, origColor, color);
}

function floodFillHelper(
	pos: Pos,
	image: Array<Array<number>>,
	visited: Set<string>,
	origColor: number,
	color: number,
) {
	if (visited.has(JSON.stringify(pos))) {
		return;
	}
	visited.add(JSON.stringify(pos));
	image[pos.row][pos.col] = color;
	const neighbors = findNeighbors(image, pos, visited, origColor);
	for (const neighbor of neighbors) {
		if (!visited.has(JSON.stringify(neighbor))) {
			floodFillHelper(neighbor, image, visited, origColor, color);
		}
	}
}

function findNeighbors(
	graph: Array<Array<number>>,
	pos: Pos,
	visited: Set<string>,
	origColor: number,
) {
	const moves = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];
	const maybeNeighbors = moves.map((move) => ({
		row: pos.row + move[0],
		col: pos.col + move[1],
	}));

	return maybeNeighbors.filter((neighbor) =>
		isValid(graph, neighbor, visited, origColor),
	);
}

function isValid(
	graph: Array<Array<number>>,
	pos: Pos,
	visited: Set<string>,
	origColor: number,
) {
	return (
		pos.row >= 0 &&
		pos.row < graph.length &&
		pos.col >= 0 &&
		pos.col < graph[0].length &&
		graph[pos.row][pos.col] === origColor &&
		!visited.has(JSON.stringify(pos))
	);
}
