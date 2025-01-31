import { TreeNode } from "../dataTypes/binaryTree";

export function diameterOfBinaryTree<T>(root: TreeNode<T>): number {
	return diameterHelper(root).diameter;
}

type ReturnType = {
	height: number;
	diameter: number;
};

function diameterHelper<T>(root: TreeNode<T>): ReturnType {
	if (root.left == null && root.right == null) {
		return { height: 1, diameter: 1 };
	}
	if (root.left != null) {
		const { height, diameter } = diameterHelper(root.left);

		return {
			height: height + 1,
			diameter: Math.max(height + 1, diameter),
		};
	}
	if (root.right != null) {
		const { height, diameter } = diameterHelper(root.right);

		return {
			height: height + 1,
			diameter: Math.max(height + 1, diameter),
		};
	}

	const { height: rightHeight, diameter: rightDiameter } = diameterHelper(
		root.right!,
	);
	const { height: leftHeight, diameter: leftDiameter } = diameterHelper(
		root.left!,
	);

	return {
		height: Math.max(rightHeight, leftHeight) + 1,
		diameter: Math.max(
			rightHeight + leftHeight + 1,
			rightDiameter,
			leftDiameter,
		),
	};
}
