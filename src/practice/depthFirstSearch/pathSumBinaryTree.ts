import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function pathSum(
	binaryTree: BinaryTree<number>,
	target: number,
): boolean {
	return pathSumHelper(binaryTree.root, target);
}

function pathSumHelper(
	node: TreeNode<number> | undefined,
	target: number,
): boolean {
	if (node == null) {
		return false;
	}
	if (node.value > target) {
		return false;
	}

	if (node.value === target) {
		return true;
	}

	return (
		pathSumHelper(node.left, target - node.value) ||
		pathSumHelper(node.right, target - node.value)
	);
}
