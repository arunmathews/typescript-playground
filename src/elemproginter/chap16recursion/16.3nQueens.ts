type Pos = {
	x: number;
	y: number;
};

export function nQueens(n: number): Array<string> {
	let boardList: Pos[][] = [[]];
	for (let k = n; k >= 1; k--) {
		boardList = addQueens(k, n, boardList);
	}

	return boardList.map((board) =>
		board.map((pos) => `{${pos.x}, ${pos.y}}`).join(", "),
	);
}

function isNonAttacking(first: Pos, second: Pos): boolean {
	return (
		first.x !== second.x &&
		first.y !== second.y &&
		Math.abs(first.x - second.x) !== Math.abs(first.y - second.y)
	);
}

function addQueens(
	row: number,
	boardSize: number,
	boards: Array<Array<Pos>>,
): Array<Array<Pos>> {
	const newBoards: Pos[][] = [];
	for (const board of boards) {
		for (let i = 1; i <= boardSize; i++) {
			if (board.every((pos) => isNonAttacking(pos, { x: row, y: i }))) {
				newBoards.push([{ x: row, y: i }, ...board]);
			}
		}
	}

	return newBoards;
}
