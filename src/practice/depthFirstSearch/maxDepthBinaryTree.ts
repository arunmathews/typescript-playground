import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function maxDepth<T>(tree: BinaryTree<T>): number {
	const root = tree.root;

	return maxDepthHelper(root);
}

function maxDepthHelper<T>(node: TreeNode<T> | undefined): number {
	if (node == null) {
		return 0;
	}
	const leftDepth = maxDepthHelper(node.left);
	const rightDepth = maxDepthHelper(node.right);
	const max = Math.max(leftDepth, rightDepth);

	return max + 1;
}
