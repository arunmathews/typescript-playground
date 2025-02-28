import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem = {
	node: TreeNode<number>;
	level: number;
};

export function zigzagLevelOrder(
	tree: BinaryTree<number>,
): Array<Array<number>> {
	const root = tree.root;
	const queue: Array<BFSQueueItem> = [];
	queue.push({ node: root, level: 0 });
	let forward = true;
	const res: Array<Array<number>> = [];
	while (queue.length > 0) {
		const levelArray: Array<number> = [];
		const levelLength = queue.length;
		for (let i = 0; i < levelLength; i++) {
			const item = queue.shift()!;
			const level = item.level;
			const node = item.node;
			if (node.left != null) {
				queue.push({ node: node.left, level: level + 1 });
			}
			if (node.right != null) {
				queue.push({ node: node.right, level: level + 1 });
			}
			levelArray.push(node.value);
		}
		if (forward) {
			res.push(levelArray);
		} else {
			res.push(levelArray.reverse());
		}
		forward = !forward;
	}

	return res;
}
