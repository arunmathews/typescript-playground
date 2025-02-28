type Pos = {
	row: number;
	col: number;
};

export function pacificAtlantic(heights: number[][]): number[][] {
	const pacificVisited: Set<string> = new Set();
	const atlanticVisited: Set<string> = new Set();
	for (let i = 0; i < heights.length; i++) {
		dfsHelper({ row: i, col: 0 }, 0, heights, pacificVisited);
		dfsHelper(
			{ row: i, col: heights[0].length - 1 },
			0,
			heights,
			atlanticVisited,
		);
	}
	for (let j = 0; j < heights[0].length; j++) {
		dfsHelper({ row: 0, col: j }, 0, heights, pacificVisited);
		dfsHelper({ row: heights.length - 1, col: j }, 0, heights, atlanticVisited);
	}

	const intersectSet: Set<string> = new Set();
	for (const member of pacificVisited) {
		if (atlanticVisited.has(member)) {
			intersectSet.add(member);
		}
	}

	const poss: Array<Pos> = Array.from(intersectSet).map((v) => JSON.parse(v));

	return poss.map((pos) => [pos.row, pos.col]);
}

function dfsHelper(
	pos: Pos,
	parentHeight: number,
	heights: number[][],
	visited: Set<string>,
) {
	if (visited.has(JSON.stringify(pos))) {
		return;
	}
	visited.add(JSON.stringify(pos));
	const neighbors = findNeighbors(pos, parentHeight, heights, visited);
	for (const neighbor of neighbors) {
		dfsHelper(neighbor, heights[pos.row][pos.col], heights, visited);
	}
}

function findNeighbors(
	pos: Pos,
	parentHeight: number,
	heights: number[][],
	visited: Set<string>,
) {
	const moves = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];
	const maybeNeighbors = moves.map((move) => ({
		row: pos.row + move[0],
		col: pos.col + move[1],
	}));

	return maybeNeighbors.filter((neighbor) =>
		isValid(neighbor, parentHeight, heights, visited),
	);
}

function isValid(
	pos: Pos,
	parentHeight: number,
	heights: number[][],
	visited: Set<string>,
): boolean {
	return (
		pos.row >= 0 &&
		pos.row < heights.length &&
		pos.col >= 0 &&
		pos.col < heights[0].length &&
		heights[pos.row][pos.col] >= parentHeight &&
		!visited.has(JSON.stringify(pos))
	);
}
