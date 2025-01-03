export interface Queue<T> {
	items: T[];
}

export function createQueue<T>(): Queue<T> {
	return { items: [] };
}

export function enqueue<T>(item: T, queue: Queue<T>): Queue<T> {
	queue.items.push(item);

	return queue;
}

export function dequeue<T>(queue: Queue<T>): T | undefined {
	const maybeItem = queue.items.shift();

	return maybeItem;
}

export function peek<T>(queue: Queue<T>): T | undefined {
	return queue.items[0];
}

export function isEmpty<T>(queue: Queue<T>): boolean {
	return queue.items.length === 0;
}

export function size<T>(queue: Queue<T>): number {
	return queue.items.length;
}
