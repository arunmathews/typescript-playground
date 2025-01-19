import { Memoize } from "../dataTypes/memoize";

export function binomialCoefficient(n: number, k: number): number {
	type MemoizeKey = {
		n: number;
		k: number;
	};

	const memoize: Memoize<MemoizeKey, string, number> = new Memoize(
		(mk: MemoizeKey) => {
			const { n, k } = mk;
			if (k === 0) {
				return 1;
			}
			if (k > Math.floor(n / 2)) {
				return memoize.apply({ n, k: n - k });
			}
			return (
				memoize.apply({ n: n - 1, k }) + memoize.apply({ n: n - 1, k: k - 1 })
			);
		},
		JSON.stringify,
	);

	return memoize.apply({ n, k });
}
