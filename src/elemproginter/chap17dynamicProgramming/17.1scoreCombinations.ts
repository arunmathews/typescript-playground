import { Memoize } from "../dataTypes/memoize";

type MemoizeKey = {
	score: number;
	pointsPerPlay: Array<number>;
};

export function scoreCombinations(
	score: number,
	pointsPerPlay: Array<number>,
): Array<Array<number>> {
	const memoize = new Memoize<MemoizeKey, string, Array<Array<number>>>(
		(i) => {
			const { score, pointsPerPlay } = i;
			if (score === 0) {
				return [[]];
			}
			if (score < 0) {
				return [];
			}
			if (pointsPerPlay.length === 0) {
				return [];
			}
			const aPointPerPlay = pointsPerPlay[0];
			const restPointsPerPlay = pointsPerPlay.slice(1);
			const withOutAPoint: Array<Array<number>> = memoize.apply({
				score,
				pointsPerPlay: restPointsPerPlay,
			});
			const withAPoints: Array<Array<number>> = memoize.apply({
				score: score - aPointPerPlay,
				pointsPerPlay: pointsPerPlay,
			});
			const withAPointsPlusA = withAPoints.map((list) =>
				list.concat(aPointPerPlay),
			);

			return withOutAPoint.concat(withAPointsPlusA);
		},
		(i) => JSON.stringify(i),
	);

	return memoize.apply({ score, pointsPerPlay });
}
