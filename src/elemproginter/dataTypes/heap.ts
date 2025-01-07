type Comparator<T> = (a: T, b: T) => boolean;

export class BinaryHeap<T> {
	private heap: T[];
	private comparator: Comparator<T>;

	constructor(comparator: Comparator<T>) {
		this.heap = [];
		this.comparator = comparator;
	}

	insert(value: T): void {
		this.heap.push(value);
		this.bubbleUp(this.heap.length - 1);
	}

	extract(): T | undefined {
		if (this.heap.length === 0) {
			return undefined;
		}
		const rootValue = this.heap[0];
		const lastValue = this.heap.pop();
		if (lastValue != null) {
			this.heap[0] = lastValue;
		}
		this.bubbleDown(0);
		return rootValue;
	}

	peek(): T | undefined {
		return this.heap[0];
	}

	size(): number {
		return this.heap.length;
	}

	private bubbleUp(index: number): void {
		const elem = this.heap[index];
		while (index > 0) {
			const parentIdx = Math.floor((index - 1) / 2);
			const parentElem = this.heap[parentIdx];
			if (this.comparator(parentElem, elem)) {
				break;
			}
			this.heap[parentIdx] = elem;
			this.heap[index] = parentElem;
			index = parentIdx;
		}
	}

	private bubbleDown(index: number): void {
		const elem = this.heap[index];
		const length = this.heap.length;
		while (true) {
			const leftChildIdx = index * 2 + 1;
			const rightChildIdx = index * 2 + 2;
			let swapIdx = undefined;
			if (leftChildIdx < length) {
				if (!this.comparator(elem, this.heap[leftChildIdx])) {
					swapIdx = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				if (
					(swapIdx === undefined &&
						!this.comparator(elem, this.heap[rightChildIdx])) ||
					(swapIdx != null &&
						!this.comparator(this.heap[swapIdx], this.heap[rightChildIdx]))
				) {
					swapIdx = rightChildIdx;
				}
			}
			if (swapIdx == null) {
				break;
			}
			this.heap[index] = this.heap[swapIdx];
			this.heap[swapIdx] = elem;
			index = swapIdx;
		}
	}
}
