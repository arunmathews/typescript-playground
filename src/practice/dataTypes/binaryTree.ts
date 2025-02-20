export type TreeNode<T> = {
	left: TreeNode<T> | undefined;
	right: TreeNode<T> | undefined;
	value: T;
};

export class BinaryTree<T> {
	root: TreeNode<T>;

	constructor(value: T) {
		this.root = {
			left: undefined,
			right: undefined,
			value,
		};
	}

	insert(value: T) {
		this.root = this.insertHelper(this.root, value);
	}

	private insertHelper(node: TreeNode<T> | undefined, value: T): TreeNode<T> {
		if (node == null) {
			return {
				left: undefined,
				right: undefined,
				value,
			};
		}
		if (value < node.value) {
			node.left = this.insertHelper(node.left, value);
		} else {
			node.right = this.insertHelper(node.right, value);
		}

		return node;
	}
}
