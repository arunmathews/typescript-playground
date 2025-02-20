import { TreeNode } from "../dataTypes/binaryTree";

export function reconstructBinaryTree<T>(
	inOrder: Array<T>,
	preOrder: Array<T>,
): TreeNode<T> | undefined {
	if (inOrder.length != preOrder.length) {
		throw new Error(
			"Both in order list length and pre order list length should be the same size",
		);
	}
	if (inOrder.length === 0) {
		return undefined;
	}
	if (inOrder.length === 1) {
		return {
			value: inOrder[0],
			left: undefined,
			right: undefined,
		};
	}
	const rootValue = preOrder[0];
	const inOrderRootIndex = inOrder.findIndex((t) => t === rootValue);
	const leftInOrder = inOrder.slice(0, inOrderRootIndex);
	const rightInOrder = inOrder.slice(inOrderRootIndex + 1);
	const leftPreOrder = preOrder.slice(1, 1 + leftInOrder.length);
	const rightPreOrder = preOrder.slice(1 + leftInOrder.length);
	const leftTree = reconstructBinaryTree(leftInOrder, leftPreOrder);
	const rightTree = reconstructBinaryTree(rightInOrder, rightPreOrder);
	return {
		value: rootValue,
		left: leftTree,
		right: rightTree,
	};
}
