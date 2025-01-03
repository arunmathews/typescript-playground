import { peek, Stack, push as stackPush } from "../dataTypes/stack";

export interface StackWithMaxItem<T> {
	item: T;
	max: T;
}

export type StackWithMax<T> = Stack<StackWithMaxItem<T>>;

export function push<T>(stack: StackWithMax<T>, item: T): StackWithMax<T> {
	const currTop = peek(stack);
	const newMax =
		currTop === undefined ? item : item > currTop.max ? item : currTop.max;
	stackPush(stack, { item, max: newMax });

	return stack;
}

export function max<T>(stack: StackWithMax<T>): T | undefined {
	const currTop = peek(stack);
	return currTop === undefined ? undefined : currTop.max;
}
