import { max } from "../chap9stacksQueues/9.1stackWithMax";
import { Memoize } from "../dataTypes/memoize";

type Item = {
	weight: number;
	value: number;
};

type MemoizeKey = {
	maxWeight: number;
	allItems: Array<Item>;
};
export function solveKnapSack(
	maxWeight: number,
	allItems: Array<Item>,
): Array<Item> {
	const memoize: Memoize<MemoizeKey, string, Array<Item>> = new Memoize(
		(mk: MemoizeKey) => {
			const { maxWeight, allItems } = mk;
			if (maxWeight <= 0) {
				return [];
			}
			if (allItems.length === 0) {
				return [];
			}
			const firstItem = allItems[0];
			const restItems = allItems.slice(1);
			if (firstItem.weight > maxWeight) {
				return memoize.apply({ maxWeight, allItems: restItems });
			} else {
				const withoutFirstItem = memoize.apply({
					maxWeight,
					allItems: restItems,
				});
				const withFirstItem = memoize.apply({
					maxWeight: maxWeight - firstItem.weight,
					allItems: restItems,
				});
				const withoutFirstItemValue = withoutFirstItem
					.map((v) => v.value)
					.reduce((acc, curr) => acc + curr, 0);
				const withFirstItemValue =
					withFirstItem
						.map((v) => v.value)
						.reduce((acc, curr) => acc + curr, 0) + firstItem.value;

				if (withoutFirstItemValue > withFirstItemValue) {
					return withoutFirstItem;
				} else {
					return [firstItem, ...withFirstItem];
				}
			}
		},
		JSON.stringify,
	);

	return memoize.apply({ maxWeight, allItems });
}
