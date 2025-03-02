type Pos = {
	x: number;
	y: number;
};

export function orangesRotting(grid: number[][]): number {
	let minute = 0;
	let freshOranges = 0;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === 1) {
				freshOranges++;
			}
		}
	}
	const queue = makeQueue(grid);
	let visited: Set<string> = new Set();
	while (freshOranges > 0 && queue.length > 0) {
		minute++;
		const stepLength = queue.length;
		for (let i = 0; i < stepLength; i++) {
			const cell = queue.shift()!;
			visited.add(JSON.stringify(cell));
			const nextCells = findNextCells(grid, cell, visited);
			nextCells.forEach((nextCell) => {
				grid[nextCell.y][nextCell.x] = 2;
			});
			freshOranges = freshOranges - nextCells.length;
			queue.push(...nextCells);
		}
	}
	if (freshOranges === 0) {
		return minute;
	}
	return -1;
}

function findNextCells(grid: number[][], pos: Pos, visited: Set<string>) {
	const moves = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
	];

	const maybeCells = moves.map((move) => ({
		x: pos.x + move[0],
		y: pos.y + move[1],
	}));

	return maybeCells.filter((maybeCell) => isValid(grid, maybeCell, visited));
}

function isValid(grid: number[][], pos: Pos, visited: Set<String>): boolean {
	return (
		pos.x >= 0 &&
		pos.x < grid[0].length &&
		pos.y >= 0 &&
		pos.y < grid.length &&
		grid[pos.y][pos.x] === 1 &&
		!visited.has(JSON.stringify(pos))
	);
}

function makeQueue(grid: number[][]): Array<Pos> {
	const queue: Array<Pos> = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 2) {
				queue.push({ x: j, y: i });
			}
		}
	}

	return queue;
}
