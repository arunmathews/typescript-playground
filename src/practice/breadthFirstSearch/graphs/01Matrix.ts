type Pos = {
	row: number;
	col: number;
};

export function updateMatrix(mat: number[][]): number[][] {
	const distMat: number[][] = [];
	const queue: Array<Pos> = [];
	let nonZeroes = 0;
	let dist = 0;
	for (let i = 0; i < mat.length; i++) {
		distMat.push([]);
		for (let j = 0; j < mat[i].length; j++) {
			if (mat[i][j] === 0) {
				queue.push({ row: i, col: j });
				distMat[i].push(dist);
			} else {
				distMat[i].push(-1);
				nonZeroes++;
			}
		}
	}

	while (nonZeroes > 0 && queue.length > 0) {
		dist++;
		const levelLength = queue.length;
		for (let i = 0; i < levelLength; i++) {
			const pos = queue.shift()!;
			const neighbors = findNeighbors(distMat, pos);
			neighbors.forEach((neighbor) => {
				queue.push(neighbor);
				distMat[neighbor.row][neighbor.col] = dist;
			});
			nonZeroes = nonZeroes - neighbors.length;
		}
	}

	return distMat;
}

function findNeighbors(distMat: number[][], pos: Pos) {
	const moves = [
		[0, 1],
		[0, -1],
		[-1, 0],
		[1, 0],
	];
	const maybePoss = moves.map((move) => ({
		row: pos.row + move[0],
		col: pos.col + move[1],
	}));

	return maybePoss.filter((maybePos) => isValid(distMat, maybePos));
}

function isValid(distMat: number[][], pos: Pos): boolean {
	return (
		pos.row >= 0 &&
		pos.row < distMat.length &&
		pos.col >= 0 &&
		pos.col < distMat[0].length &&
		distMat[pos.row][pos.col] === -1
	);
}
