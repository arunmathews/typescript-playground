export function minimumDelaySchedule(
	times: Array<number>,
	deps: Map<number, Array<number>>,
): number | undefined {
	const minTImes = new Array<number>();
	const graph = new Map<number, Set<number>>();
	const preReqCount = new Map<number, number>();
	for (let i = 0; i < times.length; i++) {
		minTImes.push(times[i]);
		graph.set(i, new Set());
		preReqCount.set(i, 0);
	}
	deps.forEach((v, k) => {
		v.forEach((dep) => graph.get(dep)!.add(k));
		const currDegree = preReqCount.get(k)!;
		preReqCount.set(k, currDegree + 1);
	});
	const queue = new Array<number>();
	preReqCount.forEach((v, k) => {
		if (v === 0) {
			queue.push(k);
		}
	});

	let processedTasks = 0;
	while (queue.length > 0) {
		const nextTask = queue.shift()!;
		processedTasks++;
		for (const neighbor of graph.get(nextTask)!) {
			minTImes[neighbor] = Math.max(
				minTImes[neighbor],
				minTImes[nextTask] + times[neighbor],
			);
			preReqCount.set(neighbor, preReqCount.get(neighbor)! - 1);
			if (preReqCount.get(neighbor)! === 0) {
				queue.push(neighbor);
			}
		}
	}
	if (processedTasks < times.length) {
		return undefined;
	}

	return Math.max(...minTImes);
}
