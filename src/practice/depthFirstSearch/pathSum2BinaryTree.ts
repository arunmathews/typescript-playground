import { BinaryTree, TreeNode } from "../dataTypes/binaryTree";

export function pathSum2(
	tree: BinaryTree<number>,
	sum: number,
): Array<Array<number>> {
	return pathSumHelper(tree.root, sum);
}

function pathSumHelper(
	node: TreeNode<number> | undefined,
	sum: number,
): Array<Array<number>> {
	if (node == null) {
		return [];
	}

	if (sum === node.value && node.left == null && node.right == null) {
		return [[node.value]];
	}

	const left = pathSumHelper(node.left, sum - node.value);
	const right = pathSumHelper(node.right, sum - node.value);
	const concat = [...left, ...right];
	concat.forEach((arr) => arr.unshift(node.value));

	return concat;
}
