import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function diameterBinaryTree(tree: BinaryTree<number>): number {
	return diameterHelper(tree.root).maxDiameter;
}

type ReturnType = {
	maxLength: number;
	maxDiameter: number;
};

function diameterHelper(node: TreeNode<number> | undefined): ReturnType {
	if (node == null) {
		return {
			maxLength: 0,
			maxDiameter: 0,
		};
	}

	const leftReturn = diameterHelper(node.left);
	const rightReturn = diameterHelper(node.right);

	const maxDiameter = Math.max(
		leftReturn.maxDiameter,
		rightReturn.maxDiameter,
		leftReturn.maxLength + rightReturn.maxLength,
	);

	return {
		maxLength: Math.max(leftReturn.maxLength, rightReturn.maxLength) + 1,
		maxDiameter,
	};
}
