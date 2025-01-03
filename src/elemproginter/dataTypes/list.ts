export interface ListNode<T> {
	value: T;
	next: ListNode<T> | undefined;
}

export function printList<T>(ll: ListNode<T>): void {
	const arr = new Array<T>();
	arr.push(ll.value);
	while (ll.next != null) {
		arr.push(ll.next.value);
		ll = ll.next;
	}

	console.log(arr.join("->"));
}
