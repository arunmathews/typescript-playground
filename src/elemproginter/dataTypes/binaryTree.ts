export interface TreeNode<T> {
	value: T;
	left: TreeNode<T> | undefined;
	right: TreeNode<T> | undefined;
}

export function createNode<T>(value: T): TreeNode<T> {
	return {
		value,
		left: undefined,
		right: undefined,
	};
}

export function insert<T>(
	root: TreeNode<T> | undefined,
	value: T,
): TreeNode<T> {
	if (root == null) {
		return createNode(value);
	}
	if (value < root.value) {
		root.left = insert(root.left, value);
	} else {
		root.right = insert(root.right, value);
	}
	return root;
}
