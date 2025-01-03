export interface Stack<T> {
	items: T[];
}
export function push<T>(stack: Stack<T>, item: T): Stack<T> {
	stack.items.push(item);

	return stack;
}

export function pop<T>(stack: Stack<T>): T | undefined {
	return stack.items.pop();
}

export function peek<T>(stack: Stack<T>): T | undefined {
	return stack.items[stack.items.length - 1];
}

export function isEmpty<T>(stack: Stack<T>): boolean {
	return stack.items.length === 0;
}

export function size<T>(stack: Stack<T>): number {
	return stack.items.length;
}
