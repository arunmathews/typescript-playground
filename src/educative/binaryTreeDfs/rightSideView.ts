import { TreeNode } from "../dataTypes/binaryTree";

type BinaryQueueItem<T> = {
	node: TreeNode<T>;
	level: number;
};

export function rightSideViewBFS<T>(root: TreeNode<T>): Array<T> {
	const queue: Array<BinaryQueueItem<T>> = [];
	queue.push({ node: root, level: 0 });
	let currentLevel: number | undefined = undefined;
	let currentItem: T | undefined = undefined;
	let res: Array<T> = [];
	while (queue.length > 0) {
		const nextItem = queue.shift()!;
		if (nextItem.node.left != null) {
			queue.push({ node: nextItem.node.left, level: nextItem.level + 1 });
		}
		if (nextItem.node.right != null) {
			queue.push({ node: nextItem.node.right, level: nextItem.level + 1 });
		}
		if (
			currentLevel != null &&
			currentItem != null &&
			nextItem.level > currentLevel
		) {
			res.push(currentItem);
		}
		currentItem = nextItem.node.data;
		currentLevel = nextItem.level;
	}
	if (currentItem != null) {
		res.push(currentItem);
	}

	return res;
}

export function rightSideViewDFS<T>(root: TreeNode<T>): Array<T> {
	const accum: Array<T> = [];
	dfs(root, 0, accum);

	return accum;
}

function dfs<T>(node: TreeNode<T>, level: number, accum: Array<T>) {
	if (level === accum.length) {
		accum.push(node.data);
	}
	if (node.right != null) {
		dfs(node.right, level + 1, accum);
	}
	if (node.left != null) {
		dfs(node.left, level + 1, accum);
	}
}
