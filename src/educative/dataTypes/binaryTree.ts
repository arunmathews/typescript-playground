export class TreeNode<T> {
	left: TreeNode<T> | undefined;
	right: TreeNode<T> | undefined;
	data: T;

	constructor(data: T) {
		this.left = undefined;
		this.right = undefined;
		this.data = data;
	}
}
