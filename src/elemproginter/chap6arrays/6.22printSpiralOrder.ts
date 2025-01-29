export function printSpiralOrder(arr: number[][]): void {
	let startInd = 0;
	let endInd = arr.length - 1;
	while (startInd <= endInd) {
		let fixed = startInd;
		for (let i = startInd; i <= endInd; i++) {
			console.log(arr[fixed][i]);
		}
		fixed = endInd;
		for (let i = startInd + 1; i <= endInd; i++) {
			console.log(arr[i][fixed]);
		}
		for (let i = endInd - 1; i >= startInd; i--) {
			console.log(arr[fixed][i]);
		}
		fixed = startInd;
		for (let i = endInd - 1; i >= startInd + 1; i--) {
			console.log(arr[i][fixed]);
		}
		startInd++;
		endInd--;
	}
}

function findExitColumn(grid) {
	const arr = [];
	for (let i = 0; i < grid.length; i++) {
		let res;
		let coord = { row: 0, col: i };
		do {
			res = findNextCell(grid, coord);
			if (res.coord != null) {
				coord = res.coord;
			}
		} while (res != null && res.result === "active");
		if (res.result === "done" && res.coord != null) {
			arr.push(res.coord.col);
		} else {
			arr.push(-1);
		}
	}

	return arr;
}

type Coord = {
	row: number;
	col: number;
};

function findNextCell(grid, coord) {
	const { row, col } = coord;
	let returnVal;
	let maybeNextCoord;
	if (grid[row][col] === -1) {
		maybeNextCoord = {
			row: row - 1,
			col: col + 1,
		};
	} else {
		maybeNextCoord = {
			row: row + 1,
			col: col + 1,
		};
	}
	if (maybeNextCoord.col >= 0 && maybeNextCoord.col < grid[0].length) {
		if (maybeNextCoord.row > grid.length) {
			return {
				coord: maybeNextCoord,
				result: "done",
			};
		} else {
			return {
				coord: maybeNextCoord,
				result: "active",
			};
		}
	} else {
		return {
			result: "failure",
		};
	}
}
