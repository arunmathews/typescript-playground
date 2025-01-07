type Comparator<T> = (a: T, b: T) => boolean;

export class BinaryHeap<T> {
	private heap: Array<T>;
	private comparator: Comparator<T>;

	constructor(comparator: Comparator<T>) {
		this.heap = [];
		this.comparator = comparator;
	}

	public insert(value: T): void {
		this.heap.push(value);
		this.bubbleUp(this.heap.length - 1);
		console.log(this.heap);
	}

	public extract(): T | undefined {
		const maybeLastValue = this.heap.pop();
		if (maybeLastValue == null) {
			return maybeLastValue;
		}
		const rootValue = this.heap[0];
		this.heap[0] = maybeLastValue;
		this.bubbleDown(0);

		console.log(this.heap);

		return rootValue;
	}

	public peek(): T | undefined {
		return this.heap[0];
	}

	public size(): number {
		return this.heap.length;
	}

	private bubbleUp(index: number): void {
		while (index > 0) {
			const currentVal = this.heap[index];
			const parentIdx = Math.floor((index - 1) / 2);
			const parentVal = this.heap[parentIdx];
			if (this.comparator(parentVal, currentVal)) {
				break;
			}
			this.heap[index] = parentVal;
			this.heap[parentIdx] = currentVal;
			index = parentIdx;
		}
	}

	private bubbleDown(index: number): void {
		const heapLength = this.heap.length;
		const currentVal = this.heap[index];
		while (true) {
			const leftChildIndex = index * 2 + 1;
			const rightChileIndex = index * 2 + 2;
			let swapIndex = undefined;
			if (
				leftChildIndex < heapLength &&
				!this.comparator(currentVal, this.heap[leftChildIndex])
			) {
				swapIndex = leftChildIndex;
			}
			if (rightChileIndex < heapLength) {
				if (
					(swapIndex == null &&
						!this.comparator(currentVal, this.heap[rightChileIndex])) ||
					(swapIndex != null &&
						!this.comparator(this.heap[swapIndex], this.heap[rightChileIndex]))
				) {
					swapIndex = rightChileIndex;
				}
			}
			if (swapIndex == null) {
				break;
			}
			this.heap[index] = this.heap[swapIndex];
			this.heap[swapIndex] = currentVal;
			index = swapIndex;
		}
	}
}
