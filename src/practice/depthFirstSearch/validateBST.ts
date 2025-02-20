import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function validateBST(tree: BinaryTree<number>): boolean {
	return validateBSTHelper(tree.root, Infinity, -Infinity);
}

function validateBSTHelper(
	node: TreeNode<number> | undefined,
	max: number,
	min: number,
): boolean {
	if (node == null) {
		return true;
	}
	if (node.value <= min || node.value >= max) {
		return false;
	}

	return (
		validateBSTHelper(node.left, node.value, min) &&
		validateBSTHelper(node.right, max, node.value)
	);
}
