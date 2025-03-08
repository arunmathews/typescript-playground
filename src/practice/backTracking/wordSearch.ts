type Pos = {
	row: number;
	col: number;
};

type BFSQueueItem = {
	pos: Pos;
	soFar: string;
};

export function existBFS(board: string[][], word: string): boolean {
	if (board.length === 0) {
		return false;
	}
	if (word.length === 0) {
		return true;
	}
	const searchStarts: Array<BFSQueueItem> = [];
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] === word.charAt(0)) {
				searchStarts.push({ pos: { row: i, col: j }, soFar: board[i][j] });
			}
		}
	}

	searchStarts.forEach((searchStart) => {
		const queue: Array<BFSQueueItem> = [];
		queue.push(searchStart);
		const visited: Set<string> = new Set();
		while (queue.length > 0) {
			const nextItem = queue.shift()!;
			visited.add(JSON.stringify(nextItem.pos));
			if (nextItem.soFar === word) {
				return true;
			}
			const nextPoss = nearbyPoss(
				nextItem.pos,
				board,
				visited,
				word,
				nextItem.soFar,
			);
			nextPoss.forEach((nextPos) => {
				queue.push({
					pos: nextPos,
					soFar: `${nextItem.soFar}${board[nextPos.row][nextPos.col]}`,
				});
			});
		}
	});

	return false;
}

function nearbyPoss(
	pos: Pos,
	board: string[][],
	visited: Set<string>,
	word: string,
	index: number,
) {
	const moves = [
		[0, 1],
		[0, -1],
		[-1, 0],
		[1, 0],
	];
	const maybeMoves = moves.map((move) => ({
		row: pos.row + move[0],
		col: pos.col + move[1],
	}));

	return maybeMoves.filter((maybeMove) =>
		isValid(maybeMove, board, visited, word, index),
	);
}

function isValid(
	pos: Pos,
	board: string[][],
	visited: Set<string>,
	word: string,
	index: number,
): boolean {
	return (
		pos.row >= 0 &&
		pos.row < board.length &&
		pos.col >= 0 &&
		pos.col < board[0].length &&
		!visited.has(JSON.stringify(pos)) &&
		word[index] === board[pos.row][pos.col]
	);
}

export function exist(board: string[][], word: string): boolean {
	if (board.length === 0) {
		return false;
	}
	if (word.length === 0) {
		return true;
	}

	function dfs(pos: Pos, index: number, visited: Set<string>) {
		if (index === word.length) {
			return true;
		}
		if (
			pos.row < 0 ||
			pos.row >= board.length ||
			pos.col < 0 ||
			pos.col >= board[0].length ||
			visited.has(JSON.stringify(pos)) ||
			word[index] !== board[pos.row][pos.col]
		) {
			return false;
		}
		visited.add(JSON.stringify(pos));
		const moves = [
			[0, -1],
			[0, 1],
			[1, 0],
			[-1, 0],
		];
		for (const [dr, dc] of moves) {
			if (dfs({ row: pos.row + dr, col: pos.col + dc }, index + 1, visited)) {
				return true;
			}
		}
		visited.delete(JSON.stringify(pos));
		return false;
	}

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] === word[0]) {
				const visited: Set<string> = new Set();
				if (dfs({ row: i, col: j }, 0, visited)) {
					return true;
				}
			}
		}
	}

	return false;
}
