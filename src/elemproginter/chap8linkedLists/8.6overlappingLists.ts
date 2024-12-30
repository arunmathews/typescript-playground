import { ListNode } from "./listUtils";

export function overlappingLists<T>(
	l1: ListNode<T>,
	l2: ListNode<T>,
): ListNode<T> | undefined {
	let extra = 0;
	let l1Current: ListNode<T> | undefined = l1;
	let l2Current: ListNode<T> | undefined = l2;
	let l1Smaller = true;
	while (l1Current != null || l2Current != null) {
		if (l1Current != null) {
			extra++;
			l1Smaller = false;
			l1Current = l1Current.next;
		}
		if (l2Current != null) {
			extra++;
			l2Current = l2Current.next;
		}
	}
	let iter: ListNode<T> | undefined = l1Smaller ? l2 : l1;
	while (extra > 0 && iter != null) {
		iter = iter.next;
		extra--;
	}
	let otherStart: ListNode<T> | undefined = l1Smaller ? l1 : l2;
	while (iter != null && otherStart != null) {
		if (iter === otherStart) {
			return iter;
		}
		iter = iter.next;
		otherStart = otherStart.next;
	}

	return undefined;
}
