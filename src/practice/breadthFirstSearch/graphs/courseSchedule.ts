export function canFinish(
	numCourses: number,
	prerequisites: number[][],
): boolean {
	const graph: Map<number, Set<number>> = new Map();
	const inDegrees: Array<number> = Array(numCourses).fill(0);
	prerequisites.forEach((tuple) => {
		const [course, preReq] = tuple;
		inDegrees[course] = inDegrees[course] + 1;
		if (!graph.has(preReq)) {
			graph.set(preReq, new Set());
		}
		graph.get(preReq)!.add(course);
	});
	const queue: Array<number> = [];
	for (let i = 0; i < inDegrees.length; i++) {
		if (inDegrees[i] === 0) {
			queue.push(i);
		}
	}
	let courseTaken = 0;
	while (queue.length > 0) {
		const nextCourse = queue.shift()!;
		courseTaken++;
		if (graph.has(nextCourse)) {
			const afterCourses = graph.get(nextCourse)!;
			afterCourses.forEach((afterCourse) => {
				inDegrees[afterCourse] = inDegrees[afterCourse] - 1;
				if (inDegrees[afterCourse] === 0) {
					queue.push(afterCourse);
				}
			});
		}
	}
	if (courseTaken === numCourses) {
		return true;
	} else {
		return false;
	}
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const graph: Map<number, Set<number>> = new Map();
	const inDegrees: Array<number> = Array(numCourses).fill(0);
	prerequisites.forEach((tuple) => {
		const [course, preReq] = tuple;
		inDegrees[course]++;
		if (!graph.has(preReq)) {
			graph.set(preReq, new Set());
		}
		graph.get(preReq)?.add(course);
	});
	const queue: Array<number> = [];
	const order: Array<number> = [];
	for (let i = 0; i < inDegrees.length; i++) {
		if (inDegrees[i] === 0) {
			queue.push(i);
		}
	}
	while (queue.length > 0) {
		const nextCourse = queue.shift()!;
		order.push(nextCourse);
		if (graph.has(nextCourse)) {
			graph.get(nextCourse)?.forEach((afterCourse) => {
				inDegrees[afterCourse]--;
				if (inDegrees[afterCourse] === 0) {
					queue.push(afterCourse);
				}
			});
		}
	}

	if (order.length === numCourses) {
		return order;
	} else {
		return [];
	}
}
