type Pos = {
	row: number;
	col: number;
};
export function numIslands(grid: string[][]): number {
	const visited: Set<string> = new Set();
	let islands = 0;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "1") {
				const pos = {
					row: i,
					col: j,
				};
				if (!visited.has(JSON.stringify(pos))) {
					islands++;
					dfsHelper(pos, grid, visited);
				}
			}
		}
	}

	return islands;
}

function dfsHelper(pos: Pos, grid: string[][], visited: Set<string>) {
	if (visited.has(JSON.stringify(pos))) {
		return;
	}
	visited.add(JSON.stringify(pos));
	const neighbors = findNeighbors(pos, grid, visited);
	for (const neighbor of neighbors) {
		dfsHelper(neighbor, grid, visited);
	}
}

function findNeighbors(pos: Pos, grid: string[][], visited: Set<string>) {
	const moves = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];
	const maybePoss = moves.map((move) => ({
		row: pos.row + move[0],
		col: pos.col + move[1],
	}));

	return maybePoss.filter((pos) => isValid(pos, grid, visited));
}

function isValid(pos: Pos, grid: string[][], visited: Set<string>): boolean {
	return (
		pos.row >= 0 &&
		pos.row < grid.length &&
		pos.col >= 0 &&
		pos.col < grid[0].length &&
		grid[pos.row][pos.col] === "1" &&
		!visited.has(JSON.stringify(pos))
	);
}
