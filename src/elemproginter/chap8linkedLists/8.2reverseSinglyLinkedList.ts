import { ListNode } from "./listUtils";

export function reverseLinkedList<T>(ll: ListNode<T>): ListNode<T> | undefined {
	let prev: ListNode<T> | undefined = undefined;
	let current: ListNode<T> | undefined = ll;
	while (current != null) {
		const next: ListNode<T> | undefined = current.next;
		current.next = prev;
		prev = current;
		current = next;
	}

	return prev;
}

export function reverseLinkedListRec<T>(
	ll: ListNode<T>,
): ListNode<T> | undefined {
	if (ll == null || ll.next == null) {
		return ll;
	}

	const prev = reverseLinkedListRec(ll.next);
	ll.next.next = ll;

	return prev;
}
