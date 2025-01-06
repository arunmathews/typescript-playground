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

export class TreeNodeWithParent<T> {
	value: T;
	left: TreeNodeWithParent<T> | undefined;
	right: TreeNodeWithParent<T> | undefined;
	parent: TreeNodeWithParent<T> | undefined;

	constructor(
		value: T,
		parent: TreeNodeWithParent<T> | undefined = undefined,
		left: TreeNodeWithParent<T> | undefined,
		right: TreeNodeWithParent<T> | undefined,
	) {
		this.value = value;
		this.parent = parent;
		this.left = left;
		this.right = right;
	}
}

export function inOrderTraversal<T, P>(
	root: TreeNode<T>,
	fn: (t: T) => P,
): void {
	const maybeLeft = root.left;
	if (maybeLeft != null) {
		inOrderTraversal(maybeLeft, fn);
	}
	fn(root.value);
	const maybeRight = root.right;
	if (maybeRight != null) {
		inOrderTraversal(maybeRight, fn);
	}
}

export function preOrderTraversal<T, P>(
	root: TreeNode<T>,
	fn: (t: T) => P,
): void {
	fn(root.value);
	const maybeLeft = root.left;
	if (maybeLeft != null) {
		preOrderTraversal(maybeLeft, fn);
	}
	const maybeRight = root.right;
	if (maybeRight != null) {
		preOrderTraversal(maybeRight, fn);
	}
}
