import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem = {
	node: TreeNode<number> | undefined;
	level: number;
};

export function maxWidthBinaryTree(tree: BinaryTree<number>): number {
	const queue: Array<BFSQueueItem> = [];
	const root = tree.root;
	queue.push({ node: root, level: 0 });
	let maxWidth = 0;
	while (queue.length > 0) {
		const levelLength = queue.length;
		let start: number | undefined;
		let end: number | undefined;
		for (let i = 0; i < levelLength; i++) {
			const nextItem = queue.shift()!;
			if (nextItem.node != null) {
				if (start == null) {
					start = i;
				} else {
					end = i;
				}
				queue.push({ node: nextItem.node.left, level: nextItem.level + 1 });
				queue.push({ node: nextItem.node.right, level: nextItem.level + 1 });
			}
		}
		if (start != null && end != null) {
			maxWidth = Math.max(maxWidth, end - start);
		}
	}

	return maxWidth;
}
