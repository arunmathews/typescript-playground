export class Memoize<I, K, O> {
	private f: (i: I) => O;
	private cache: Map<K, O> = new Map();
	private keyMapper: (i: I) => K;

	constructor(f: (i: I) => O, keyMapper: (i: I) => K) {
		this.f = f;
		this.keyMapper = keyMapper;
	}

	apply(i: I): O {
		const mappedKey = this.keyMapper(i);
		const maybeO = this.cache.get(mappedKey);
		if (maybeO != null) {
			return maybeO;
		} else {
			const newO = this.f(i);
			this.cache.set(mappedKey, newO);

			return newO;
		}
	}
}
