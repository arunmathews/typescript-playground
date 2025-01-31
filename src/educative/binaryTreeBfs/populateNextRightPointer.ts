import { TreeNode } from "../dataTypes/binaryTree";

type BFSQueueItem<T> = {
	node: TreeNode<T>;
	level: number;
};

function populateNextPointers<T>(root: TreeNode<T>) {
	if (root == null) {
		return root;
	}
	const queue: Array<BFSQueueItem<T>> = [];
	queue.push({ node: root, level: 0 });
	while (queue.length > 0) {
		const currentItem = queue.shift()!;
		const currentNode = currentItem.node;
		if (currentNode.left != null) {
			queue.push({ node: currentNode.left, level: currentItem.level + 1 });
		}
		if (currentNode.right != null) {
			queue.push({ node: currentNode.right, level: currentItem.level + 1 });
		}
		if (queue.length > 0) {
			const nextItem = queue[0];
			if (currentItem.level === nextItem.level) {
				currentItem.node.next = nextItem.node;
			}
		}
	}

	return root;
}
