import { TreeNode } from "../dataTypes/binaryTree";

export function symmetricBinaryTree<T>(root: TreeNode<T>): boolean {
	return isMirror(root.left, root.right);
}

function isMirror<T>(
	node1: TreeNode<T> | undefined,
	node2: TreeNode<T> | undefined,
): boolean {
	if (node1 == null && node2 == null) {
		return true;
	}
	if (node1 == null || node2 == null) {
		return false;
	}

	return (
		node1.value === node2.value &&
		isMirror(node1.left, node2.right) &&
		isMirror(node1.right, node2.left)
	);
}
