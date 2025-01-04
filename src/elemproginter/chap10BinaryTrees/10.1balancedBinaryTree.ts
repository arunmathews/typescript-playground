import { TreeNode } from "../dataTypes/binaryTree";

export function isBalancedBinaryTree<T>(root: TreeNode<T>): boolean {
	return isNodeBalanced(root).isBalanced;
}

type ReturnType = {
	isBalanced: boolean;
	height: number;
};

function isNodeBalanced<T>(node: TreeNode<T> | undefined): ReturnType {
	if (node != null) {
		const leftTree = node.left;
		const rightTree = node.right;
		const leftReturn = isNodeBalanced(leftTree);
		const rightReturn = isNodeBalanced(rightTree);
		const newHeight = 1 + Math.max(leftReturn.height, rightReturn.height);
		const newBalanced =
			leftReturn.isBalanced &&
			rightReturn.isBalanced &&
			Math.abs(leftReturn.height - rightReturn.height) <= 1;

		return { isBalanced: newBalanced, height: newHeight };
	} else {
		return { isBalanced: true, height: 0 };
	}
}
