import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function longestUnivalue(tree: BinaryTree<number>): number {
	return longestUnivalueHelper(tree.root).maxLength;
}

type ReturnType = {
	maxLength: number;
	nodeLength: number;
};
function longestUnivalueHelper(node: TreeNode<number> | undefined): ReturnType {
	if (node == null) {
		return {
			maxLength: 0,
			nodeLength: 0,
		};
	}
	const leftReturn = longestUnivalueHelper(node.left);
	const rightReturn = longestUnivalueHelper(node.right);
	let leftLength = 0,
		rightLength = 0;
	if (node.left != null && node.left.value === node.value) {
		leftLength = leftReturn.nodeLength + 1;
	}
	if (node.right != null && node.right.value === node.value) {
		rightLength = rightReturn.nodeLength + 1;
	}

	return {
		maxLength: Math.max(
			leftLength,
			rightLength,
			leftReturn.maxLength + rightReturn.maxLength,
		),
		nodeLength: Math.max(leftLength, rightLength),
	};
}
