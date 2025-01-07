import { TreeNodeWithParent } from "../dataTypes/binaryTree";

export function findLCA<T>(
	node1: TreeNodeWithParent<T>,
	node2: TreeNodeWithParent<T>,
): TreeNodeWithParent<T> | undefined {
	const visited = new Set<TreeNodeWithParent<T>>();
	let traverse1: TreeNodeWithParent<T> | undefined = node1;
	while (traverse1 != null) {
		visited.add(traverse1);
		traverse1 = traverse1.parent;
	}
	let traverse2: TreeNodeWithParent<T> | undefined = node2;
	while (traverse2 != null) {
		if (visited.has(traverse2)) {
			return traverse2;
		}
		traverse2 = traverse2.parent;
	}

	return undefined;
}
