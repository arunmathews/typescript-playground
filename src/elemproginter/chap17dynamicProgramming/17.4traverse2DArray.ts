type Coord = {
	row: number;
	col: number;
};

export function traverse2DArray(matrix: Array<Array<number>>): number {
	return findPathsHelper(
		matrix,
		{ row: 0, col: 0 },
		{ row: matrix.length - 1, col: matrix[0].length - 1 },
	);
}

function findPathsHelper(
	matrix: Array<Array<number>>,
	start: Coord,
	end: Coord,
): number {
	if (start.row >= matrix.length) {
		return 0;
	}
	if (start.col >= matrix[0].length) {
		return 0;
	}
	if (matrix[start.row][start.col] === 1) {
		return 0;
	}
	if (start.row === end.row && start.col === end.col) {
		return 1;
	}

	const nextDown = { row: start.row + 1, col: start.col };
	const nextRight = { row: start.row, col: start.col + 1 };

	return (
		findPathsHelper(matrix, nextDown, end) +
		findPathsHelper(matrix, nextRight, end)
	);
}
