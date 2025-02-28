import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem = {
	node: TreeNode<number>;
	level: number;
};

export function levelOrderSum(tree: BinaryTree<number>): Array<number> {
	const queue: Array<BFSQueueItem> = [];
	const sums: Array<number> = [];
	let levelSum = 0;
	let currentLevel = 0;
	queue.push({ node: tree.root, level: 0 });
	while (queue.length > 0) {
		const nextItem = queue.shift()!;
		const nextLevel = nextItem.level;
		const nextNode = nextItem.node;
		if (nextLevel > currentLevel) {
			sums.push(levelSum);
			levelSum = 0;
			currentLevel = nextLevel;
		}
		levelSum += nextNode.value;
		if (nextNode.left != null) {
			queue.push({ node: nextNode.left, level: nextLevel + 1 });
		}
		if (nextNode.right != null) {
			queue.push({ node: nextNode.right, level: nextLevel + 1 });
		}
		currentLevel = nextLevel;
	}

	sums.push(levelSum);

	return sums;
}
