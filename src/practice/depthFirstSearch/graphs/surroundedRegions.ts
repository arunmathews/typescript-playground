type Pos = {
	row: number;
	col: number;
};

export function surroundedRegions(board: string[][]): void {
	const visited: Set<string> = new Set();
	for (let i = 0; i < board.length; i++) {
		dfsHelper({ row: i, col: 0 }, board, visited);
		dfsHelper({ row: i, col: board[0].length - 1 }, board, visited);
	}
	for (let j = 0; j < board[0].length; j++) {
		dfsHelper({ row: 0, col: j }, board, visited);
		dfsHelper({ row: board.length - 1, col: j }, board, visited);
	}

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] === "O") {
				board[i][j] = "X";
			}
			if (board[i][j] === "S") {
				board[i][j] = "O";
			}
		}
	}
}

function dfsHelper(pos: Pos, board: string[][], visited: Set<string>) {
	if (visited.has(JSON.stringify(pos))) {
		return;
	}
	visited.add(JSON.stringify(pos));
	board[pos.row][pos.col] = "S";
	const neighbors = findNeighbors(pos, board, visited);
	for (const neighbor of neighbors) {
		dfsHelper(neighbor, board, visited);
	}
}

function findNeighbors(pos: Pos, board: string[][], visited: Set<string>) {
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
	return maybeNeighbors.filter((neighbor) => isValid(neighbor, board, visited));
}

function isValid(pos: Pos, board: string[][], visited: Set<string>): boolean {
	return (
		pos.row >= 0 &&
		pos.row < board.length &&
		pos.col >= 0 &&
		pos.col < board[0].length &&
		board[pos.row][pos.col] === "O" &&
		!visited.has(JSON.stringify(pos))
	);
}
