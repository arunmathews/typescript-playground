import { TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem<T> = {
	node: TreeNode<T>;
	level: number;
};
function levelOrderTraversal<T>(root: TreeNode<T>): string {
	const queue: Array<BFSQueueItem<T>> = [];
	queue.push({ node: root, level: 0 });
	let res = "";
	let currentLevel = 0;
	while (queue.length > 0) {
		const item = queue.shift()!;
		const node = item.node;
		if (node.left != null) {
			queue.push({ node: node.left, level: item.level + 1 });
		}
		if (node.right != null) {
			queue.push({ node: node.right, level: item.level + 1 });
		}
		if (res.length === 0) {
			res = `${node.data}`;
		} else {
			if (item.level !== currentLevel) {
				res = `${res}:${node.data};`;
			} else {
				res = `${res},${node.data};`;
			}
		}
		currentLevel = item.level;
	}

	return res;
}
