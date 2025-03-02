type Pos = {
	x: number;
	y: number;
};

export function minKnightMoves(x: number, y: number): number {
	const queue: Array<Pos> = [];
	const target = { x, y };
	let moveCount = -1;
	queue.push({ x: 0, y: 0 });
	const visited = new Set<string>();
	while (queue.length > 0) {
		moveCount++;
		const levelLength = queue.length;
		for (let i = 0; i < levelLength; i++) {
			const nextPos = queue.shift()!;
			visited.add(JSON.stringify(nextPos));
			if (nextPos.x === target.x && nextPos.y === target.y) {
				return moveCount;
			}
			const nextPoss = findNextPositions(nextPos, visited);
			queue.push(...nextPoss);
		}
	}

	return Infinity;
}

function findNextPositions(pos: Pos, visited: Set<string>) {
	const moves = [
		[2, 1],
		[1, 2],
		[1, -2],
		[-2, 1],
		[-1, -2],
		[-2, -1],
		[2, -1],
		[-1, 2],
	];

	const maybePoss = moves.map((move) => ({
		x: pos.x + move[0],
		y: pos.y + move[1],
	}));

	return maybePoss.filter((pos) => !visited.has(JSON.stringify(pos)));
}
