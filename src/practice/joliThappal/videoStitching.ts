type Interval = {
	start: number;
	end: number;
};

type MemoizeKey = {
	clips: Array<Interval>;
	interval: Interval;
};

export function videoStitching(clipsArr: number[][], time: number): number {
	const clips = clipsArr.map((arr) => ({
		start: arr[0],
		end: arr[1],
	}));

	clips.sort((a, b) => a.start - b.start);

	const memoize = new Memoize<MemoizeKey, string, number>(
		(i) => {
			const { clips, interval } = i;
			if (clips.length === 0) {
				return -1;
			}
			const firstClip = clips[0];
			if (firstClip.start > interval.start) {
				return -1;
			}
			if (firstClip.end >= interval.end) {
				return 1;
			}
			const withoutFirst: number = memoize.apply({
				clips: [...clips.slice(1)],
				interval,
			});
			const withFirst: number = memoize.apply({
				clips: [...clips].slice(1),
				interval: { start: firstClip.end, end: interval.end },
			});
			if (withoutFirst > withFirst) {
				return withFirst;
			}

			return withFirst + 1;
		},
		(i) => JSON.stringify(i),
	);
}

class Memoize<I, K, O> {
	private f: (i: I) => O;
	private cache: Map<K, O> = new Map();
	private keyMapper: (i: I) => K;

	constructor(f: (i: I) => O, keyMapper: (i: I) => K) {
		this.f = f;
		this.keyMapper = keyMapper;
	}

	apply(i: I): O {
		const k = this.keyMapper(i);
		if (this.cache.has(k)) {
			return this.cache.get(k)!;
		}
		const res = this.f(i);
		this.cache.set(k, res);

		return res;
	}
}

export function videoStitching2(clipsArr: number[][], time: number): number {
	const clips = clipsArr.map((arr) => ({
		start: arr[0],
		end: arr[1],
	}));

	clips.sort((a, b) => a.start - b.start);

	let end = 0,
		nextEnd = 0,
		i = 0,
		count = 0;

	while (end < time) {
		while (i < clips.length && clips[i].start <= end) {
			nextEnd = Math.max(nextEnd, clips[i].end);
			i++;
		}
		if (end === nextEnd) {
			return -1;
		}
		end = nextEnd;
		count++;
	}

	return count;
}
