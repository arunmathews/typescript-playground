import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem = {
	node: TreeNode<number>;
	level: number;
};

export function rightmostNode(tree: BinaryTree<number>): Array<number> {
	const root = tree.root;
	const queue: Array<BFSQueueItem> = [];
	let currentLevel = 0;
	let currentValue: number | undefined;
	let rightmostValues: Array<number> = [];
	queue.push({ node: root, level: currentLevel });
	while (queue.length > 0) {
		const { node, level } = queue.shift()!;
		if (level > currentLevel) {
			if (currentValue != null) {
				rightmostValues.push(currentValue);
			}
			currentLevel = level;
		}
		if (node.left != null) {
			queue.push({ node: node.left, level: level + 1 });
		}
		if (node.right != null) {
			queue.push({ node: node.right, level: level + 1 });
		}
		currentValue = node.value;
	}
	if (currentValue != null) {
		rightmostValues.push(currentValue);
	}

	return rightmostValues;
}
