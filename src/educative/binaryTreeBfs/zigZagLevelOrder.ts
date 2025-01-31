import { TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem<T> = {
	node: TreeNode<T>;
	level: number;
};
export function zigzagLevelOrder<T>(
	root: TreeNode<T> | undefined,
): Array<Array<T>> {
	if (root == null) {
		return [];
	}
	const arr: Array<Array<T>> = [];
	let levelArray: Array<T> = [];
	const queue: Array<BFSQueueItem<T>> = [];
	queue.push({ node: root, level: 0 });
	let currentLevel = 0;
	let forward = true;
	while (queue.length > 0) {
		const next = queue.shift()!;
		const node = next.node;
		if (node.left != null) {
			queue.push({ node: node.left, level: next.level + 1 });
		}
		if (node.right != null) {
			queue.push({ node: node.right, level: next.level + 1 });
		}
		if (next.level !== currentLevel) {
			if (forward) {
				arr.push(levelArray);
			} else {
				arr.push(levelArray.reverse());
			}
			forward = !forward;
			levelArray = [];
			currentLevel = next.level;
		}
		levelArray.push(node.data);
	}
	if (forward) {
		arr.push(levelArray);
	} else {
		arr.push(levelArray.reverse());
	}

	return arr;
}
