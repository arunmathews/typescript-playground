import { TreeNode } from "../dataTypes/binaryTree";

export function lowestCommonAncestor(
	root: TreeNode<number>,
	l: number,
	r: number,
): number | undefined {
	return lcaHelper(root, l, r);
}

function lcaHelper(
	node: TreeNode<number> | undefined,
	l: number,
	r: number,
): number | undefined {
	if (node == null) {
		return undefined;
	}
	if (l < node.value && r > node.value) {
		return node.value;
	} else if (l < node.value && r < node.value) {
		return lcaHelper(node.left, l, r);
	} else {
		return lcaHelper(node.right, l, r);
	}
}
