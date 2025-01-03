import { TreeNode } from "../dataTypes/binaryTree";
import {
	createQueue,
	dequeue,
	enqueue,
	isEmpty,
	Queue,
} from "../dataTypes/queue";

export function binaryTreeLevelOrderPrintNewLine<T>(root: TreeNode<T>): void {
	const queue: Queue<{ node: TreeNode<T>; level: number }> = createQueue();
	enqueue({ node: root, level: 0 }, queue);
	let currentLevel = 0;
	while (!isEmpty(queue)) {
		const toProcess = dequeue(queue);
		if (toProcess != null) {
			if (toProcess.node.left != null) {
				enqueue(
					{ node: toProcess.node.left, level: toProcess.level + 1 },
					queue,
				);
			}
			if (toProcess.node.right != null) {
				enqueue(
					{ node: toProcess.node.right, level: toProcess.level + 1 },
					queue,
				);
			}
		}
		if (toProcess != null && toProcess.level > currentLevel) {
			process.stdout.write("\n");
			currentLevel = toProcess.level;
		}
		process.stdout.write(`${toProcess?.node.value} `);
	}
}
