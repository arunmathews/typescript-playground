import { BinaryHeap } from "../dataTypes/heap";

export function sortAlmostSortedStream(stream: number[], k: number): number[] {
	const heap = new BinaryHeap<number>((a, b) => a < b);

	const output: Array<number> = [];
	for (let i = 0; i < stream.length; i++) {
		heap.insert(stream[i]);
		if (i > k) {
			const next = heap.extract();
			if (next != null) {
				output.push(next);
			}
		}
	}
	while (heap.size() > 0) {
		const next = heap.extract();
		if (next != null) {
			output.push(next);
		}
	}

	return output;
}
