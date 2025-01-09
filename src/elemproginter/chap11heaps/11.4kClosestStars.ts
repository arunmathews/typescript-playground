import { BinaryHeap } from "../dataTypes/heap";
import * as readline from "readline";
import * as fs from "fs";

type Coordinate = {
	x: number;
	y: number;
	z: number;
};

type HeapItemType = {
	id: string;
	coord: Coordinate;
};

export async function findKClosestStars(
	filePath: string,
	max: number,
): Promise<Array<string>> {
	const heap = new BinaryHeap<HeapItemType>(
		(a, b) =>
			a.coord.x ** 2 + a.coord.y ** 2 + a.coord.z ** 2 >
			b.coord.x ** 2 + b.coord.y ** 2 + b.coord.z ** 2,
	);

	const reader = readline.createInterface({
		input: fs.createReadStream(filePath),
		crlfDelay: Infinity,
	});

	let nextLine = await getNextLine(reader);
	while (nextLine != null) {
		const tokens = nextLine.split(",");
		const x = Number.parseFloat(tokens[1]);
		const y = Number.parseFloat(tokens[2]);
		const z = Number.parseFloat(tokens[3]);
		const coord = { x, y, z };
		if (heap.size() < max) {
			heap.insert({ id: tokens[0], coord });
		} else {
			const maxClosest = heap.peek();
			if (maxClosest != null) {
				if (coordDist(maxClosest.coord) > coordDist(coord)) {
					heap.extract();
					heap.insert({ id: tokens[0], coord });
				}
			}
		}
	}

	reader.close();
	const stars: Array<string> = [];
	while (heap.size() > 0) {
		const next = heap.extract();
		if (next != null) {
			stars.push(next.id);
		}
	}

	return stars;
}

async function getNextLine(reader: readline.Interface): Promise<string | null> {
	return new Promise((resolve) => {
		reader.once("line", (line) => resolve(line));
		reader.once("close", () => resolve(null));
	});
}

function coordDist(coord: Coordinate): number {
	return coord.x ** 2 + coord.y ** 2 + coord.z ** 2;
}
