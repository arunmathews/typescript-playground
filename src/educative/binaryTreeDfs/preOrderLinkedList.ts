import { TreeNode } from "../dataTypes/binaryTree";

export function flattenTree<T>(root: TreeNode<T>) {
	const res = dfs(root);

	return res.root;
}

type ReturnType<T> = {
	root: TreeNode<T>;
	last: TreeNode<T>;
};
function dfs<T>(node: TreeNode<T>): ReturnType<T> {
	if (node.left == null && node.right == null) {
		return {
			root: node,
			last: node,
		};
	} else if (node.right == null) {
		const { root, last } = dfs(node.left!);
		node.left = undefined;
		node.right = root;
		return { root: node, last };
	} else if (node.left == null) {
		const { root, last } = dfs(node.right!);
		node.left = undefined;
		node.right = root;
		return { root: node, last };
	} else {
		const { root: leftRoot, last: leftLast } = dfs(node.left!);
		const { root: rightRoot, last: rightLast } = dfs(node.right!);
		node.left = undefined;
		node.right = leftRoot;
		leftLast.left = undefined;
		leftLast.right = rightRoot;

		return { root: node, last: rightLast };
	}
}
