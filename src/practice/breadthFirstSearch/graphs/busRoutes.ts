type BFSQueueItem = {
	stop: number;
	numberRoutes: number;
};

export function numBusesToDestination(
	routes: number[][],
	source: number,
	target: number,
): number {
	if (source === target) {
		return 0;
	}

	const graph: Map<number, Set<number>> = new Map();
	for (let i = 0; i < routes.length; i++) {
		routes[i].forEach((stop) => {
			if (!graph.has(stop)) {
				graph.set(stop, new Set());
			}
			const stopSet = graph.get(stop)!;
			stopSet.add(i);
		});
	}

	if (!graph.has(source) || !graph.has(target)) {
		return -1;
	}

	const queue: Array<BFSQueueItem> = [];
	const visitedStops: Set<number> = new Set();
	const visitedRoutes: Set<number> = new Set();
	queue.push({ stop: source, numberRoutes: 0 });
	while (queue.length > 0) {
		const { stop, numberRoutes } = queue.shift()!;
		visitedStops.add(stop);
		if (stop === target) {
			return numberRoutes;
		}
		const routeSet = graph.get(stop);
		if (routeSet != null) {
			routeSet.forEach((route) => {
				if (!visitedRoutes.has(route)) {
					visitedRoutes.add(route);
					const nextStops = routes[route];
					nextStops.forEach((nextStop) => {
						if (!visitedStops.has(nextStop)) {
							queue.push({ stop: nextStop, numberRoutes: numberRoutes + 1 });
						}
					});
				}
			});
		}
	}

	return -1;
}
