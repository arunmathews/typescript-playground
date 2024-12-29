export function sudokuChecker(board: number[][]): boolean {
	if (board.length !== 9 || board[0].length !== 9) {
		return false;
	}

	let isValid = true;
	for (let i = 0; i < 9; i++) {
		isValid =
			isValid &&
			isValidRowOrCol(board, i, true) &&
			isValidRowOrCol(board, i, false);
	}
	for (let i = 0; i < 9; i += 3) {
		for (let j = 0; j < 9; j += 3) {
			isValid = isValid && isValid33Square(board, [i, j]);
		}
	}

	return isValid;
}

function isValidRowOrCol(
	board: number[][],
	index: number,
	isCol: boolean,
): boolean {
	const set = new Set<number>();
	for (let i = 0; i < 9; i++) {
		let value = board[index][i];
		if (isCol) {
			value = board[i][index];
		}
		if (value === 0) {
			continue;
		}
		if (value < 0 || value > 9) {
			return false;
		}
		if (set.has(value)) {
			return false;
		}
		set.add(value);
	}

	return true;
}

function isValid33Square(
	board: number[][],
	startPos: [number, number],
): boolean {
	const rowStart = startPos[0];
	const colStart = startPos[1];
	const set = new Set<number>();
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const value = board[rowStart + i][colStart + j];
			if (value === 0) {
				continue;
			}
			if (value < 0 || value > 9) {
				return false;
			}
			if (set.has(value)) {
				return false;
			}
			set.add(value);
		}
	}

	return true;
}
