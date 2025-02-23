import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function flatten(tree: BinaryTree<number>) {
	const res = flattenHelper(tree.root);

	return res.head;
}

type ReturnType = {
	head: TreeNode<number> | undefined;
	tail: TreeNode<number> | undefined;
};
function flattenHelper(node: TreeNode<number> | undefined): ReturnType {
	if (node == null) {
		return {
			head: undefined,
			tail: undefined,
		};
	}
	const leftFlatten = flattenHelper(node.left);
	const rightFlatten = flattenHelper(node.right);
	if (leftFlatten.head == null && rightFlatten.head == null) {
		return {
			head: node,
			tail: node,
		};
	} else if (leftFlatten.head == null) {
		node.right = rightFlatten.head;
		node.left = undefined;
		return {
			head: node,
			tail: rightFlatten.tail,
		};
	} else if (rightFlatten.head == null) {
		node.right = leftFlatten.head;
		node.left = undefined;
		return {
			head: node,
			tail: leftFlatten.tail,
		};
	} else {
		leftFlatten.tail!.right = rightFlatten.head;
		node.right = leftFlatten.head;
		node.left = undefined;
		return {
			head: node,
			tail: rightFlatten.tail,
		};
	}
}
