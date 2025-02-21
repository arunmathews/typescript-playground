import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function calculateTilt(tree: BinaryTree<number>): number {
	const res = calculateTiltHelper(tree.root);

	return res.tilt;
}

type ReturnType = {
	tilt: number;
	sum: number;
};

function calculateTiltHelper(node: TreeNode<number> | undefined): ReturnType {
	if (node == null) {
		return {
			tilt: 0,
			sum: 0,
		};
	}
	const leftReturn = calculateTiltHelper(node.left);
	const rightReturn = calculateTiltHelper(node.right);

	return {
		tilt:
			leftReturn.tilt +
			rightReturn.tilt +
			Math.abs(leftReturn.sum - rightReturn.sum),
		sum: leftReturn.sum + rightReturn.sum + node.value,
	};
}
