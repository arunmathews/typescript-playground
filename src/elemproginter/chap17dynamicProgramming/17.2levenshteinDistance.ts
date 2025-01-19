import { Memoize } from "../dataTypes/memoize";

type MemoizeKey = {
	first: Array<string>;
	second: Array<string>;
};
export function levenshteinDistance(first: string, second: string): number {
	const memoize: Memoize<MemoizeKey, string, number> = new Memoize(
		(charArrays: MemoizeKey) => {
			const { first, second } = charArrays;
			if (first.length === 0) {
				return second.length;
			}
			if (second.length === 0) {
				return first.length;
			}
			const firstFirst = first[0];
			const firstRest = first.slice(1);
			const secondFirst = second[0];
			const secondRest = second.slice(1);
			if (firstFirst === secondFirst) {
				return memoize.apply({ first: firstRest, second: secondRest });
			} else {
				return (
					1 +
					Math.min(
						memoize.apply({ first, second: secondRest }),
						memoize.apply({ first: firstRest, second }),
						memoize.apply({ first: firstRest, second: secondRest }),
					)
				);
			}
		},
		JSON.stringify,
	);

	return memoize.apply({
		first: Array.from(first),
		second: Array.from(second),
	});
}
