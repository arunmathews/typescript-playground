import { TreeNode } from "../dataTypes/binaryTree";

export function kLargestElements(
	root: TreeNode<number>,
	k: number,
): Array<number> {
	return kLargestElementsHelper(root, k, []);
}

function kLargestElementsHelper(
	node: TreeNode<number> | undefined,
	k: number,
	accum: Array<number>,
): Array<number> {
	if (node == null) {
		return accum;
	}
	const newAccum = kLargestElementsHelper(node.right, k, accum);
	if (newAccum.length === k) {
		return newAccum;
	} else {
		newAccum.push(node.value);
	}
	if (newAccum.length === k) {
		return newAccum;
	}
	return kLargestElementsHelper(node.left, k, newAccum);
}
