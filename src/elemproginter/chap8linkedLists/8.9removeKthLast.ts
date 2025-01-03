import { ListNode } from "../dataTypes/list";

export function removeKthLast<T>(ll: ListNode<T>, k: number): ListNode<T> {
	let current: ListNode<T> | undefined = ll;
	let kth = undefined;
	let count = 1;
	while (count < k + 1 && current != null) {
		current = current.next;
		count++;
	}
	if (count != k + 1) {
		throw new Error("Invalid count");
	}
	if (current == null && ll.next != null) {
		const next = ll.next;
		ll.next = undefined;
		return next;
	}
	kth = ll;
	while (current?.next != null && kth != null) {
		current = current.next;
		kth = kth.next;
	}
	if (kth != null && kth.next != null) {
		kth.next = kth.next.next;
	}

	return ll;
}
