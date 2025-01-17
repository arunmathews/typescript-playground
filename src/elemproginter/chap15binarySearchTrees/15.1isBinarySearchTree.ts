import { TreeNode } from "../dataTypes/binaryTree";

export function isBinarySearchTree(root: TreeNode<number>): boolean {
	return isBSTUtil(root, undefined, undefined);
}

function isBSTUtil(
	node: TreeNode<number> | undefined,
	min: number | undefined,
	max: number | undefined,
): boolean {
	if (node == null) {
		return true;
	}
	if (
		(min != null && node.value <= min) ||
		(max != null && node.value >= max)
	) {
		return false;
	}

	return (
		isBSTUtil(node.left, min, node.value) &&
		isBSTUtil(node.right, node.value, max)
	);
}
