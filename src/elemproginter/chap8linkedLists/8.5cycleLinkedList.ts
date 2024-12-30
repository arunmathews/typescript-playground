import { ListNode } from "./listUtils";

export function detectCycle<T>(ll: ListNode<T>): ListNode<T> | undefined {
	let slower: ListNode<T> | undefined = ll;
	let faster: ListNode<T> | undefined = ll;
	while (slower != null && faster != null && faster.next != null) {
		slower = slower.next;
		faster = faster.next.next;
		if (slower === faster) {
			let pointer1: ListNode<T> | undefined = slower;
			let pointer2: ListNode<T> | undefined = ll;
			while (pointer1 !== pointer2) {
				pointer1 = pointer1?.next;
				pointer2 = pointer2?.next;
			}

			return pointer1;
		}
	}

	return undefined;
}
