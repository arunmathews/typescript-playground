import { OrderedMap } from "immutable";

export class LRUCache {
	private map: OrderedMap<string, number>;
	constructor(private capacity: number) {
		this.map = OrderedMap<string, number>().asMutable();
	}

	get(id: string): number | undefined {
		const maybePrice = this.map.get(id);
		if (maybePrice == null) {
			return maybePrice;
		}
		this.map.delete(id);
		this.map.set(id, maybePrice);

		return maybePrice;
	}

	put(id: string, price: number): void {
		const maybePrice = this.map.get(id);
		if (maybePrice != null) {
			this.map.delete(id);
		}
		if (this.map.size === this.capacity) {
			this.map = this.map.skip(1).asMutable();
		}
		this.map.set(id, price);
	}

	getMap(): OrderedMap<string, number> {
		return this.map;
	}
}
