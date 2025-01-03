import { ListNode, printList } from "../dataTypes/list";

export function mergeSortedLists(
	l1: ListNode<number>,
	l2: ListNode<number>,
): ListNode<number> | undefined {
	let l1Iter: ListNode<number> | undefined = l1;
	let l2Iter: ListNode<number> | undefined = l2;
	let mergedLL: ListNode<number> | undefined = undefined;
	let final: ListNode<number> | undefined = undefined;
	while (l1Iter != null || l2Iter != null) {
		let newNode: ListNode<number> | undefined = undefined;
		if (l1Iter != null && l2Iter != null) {
			if (l1Iter.value < l2Iter.value) {
				newNode = {
					value: l1Iter.value,
					next: undefined,
				};
				l1Iter = l1Iter.next;
			} else {
				newNode = {
					value: l2Iter.value,
					next: undefined,
				};
				l2Iter = l2Iter.next;
			}
		} else if (l1Iter != null) {
			newNode = {
				value: l1Iter.value,
				next: undefined,
			};
			l1Iter = l1Iter.next;
		} else if (l2Iter != null) {
			newNode = {
				value: l2Iter.value,
				next: undefined,
			};
			l2Iter = l2Iter.next;
		}
		if (mergedLL == null && newNode != null) {
			mergedLL = newNode;
			final = newNode;
		} else if (newNode != null && mergedLL != null) {
			mergedLL.next = newNode;
			mergedLL = mergedLL.next;
		}
		if (final != null) {
			printList(final);
		}
	}

	return final;
}
