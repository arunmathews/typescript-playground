import { TreeNode } from "../dataTypes/binaryTree";

export function firstKeyLargerThanK(
	root: TreeNode<number>,
	k: number,
): number | undefined {
	return firstKeyLargerThanKHelper(root, k);
}

function firstKeyLargerThanKHelper(
	node: TreeNode<number> | undefined,
	k: number,
): number | undefined {
	if (node == null) {
		return undefined;
	}
	if (node.value > k) {
		const maybeGreater = firstKeyLargerThanKHelper(node.left, k);
		return maybeGreater || node.value;
	} else {
		return firstKeyLargerThanKHelper(node.right, k);
	}
}
