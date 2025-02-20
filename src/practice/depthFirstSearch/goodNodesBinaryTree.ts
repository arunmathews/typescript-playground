import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function goodNodes(tree: BinaryTree<number>): number {
	return goodNodesHelper(tree.root, -Infinity);
}

function goodNodesHelper(
	node: TreeNode<number> | undefined,
	max: number,
): number {
	if (node == null) {
		return 0;
	}
	let newMax = max;
	let thisCount = 0;
	if (node.value >= max) {
		newMax = node.value;
		thisCount++;
	}
	const leftCount = goodNodesHelper(node.left, newMax);
	const rightCount = goodNodesHelper(node.right, newMax);

	return thisCount + leftCount + rightCount;
}
