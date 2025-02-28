export function canFinish(
	numCourses: number,
	prerequisites: number[][],
): boolean {
	const graph: Map<number, Array<number>> = new Map();
	const preReqCount: Array<number> = Array(numCourses).fill(0);

	for (const [course, preReq] of prerequisites) {
		if (!graph.has(preReq)) {
			graph.set(preReq, []);
		}
		graph.get(preReq)!.push(course);
		preReqCount[course]++;
	}

	const queue: Array<number> = [];
	for (let i = 0; i < preReqCount.length; i++) {
		if (preReqCount[i] === 0) {
			queue.push(i);
		}
	}

	let count = 0;
	while (queue.length > 0) {
		const course = queue.shift()!;
		count++;
		if (graph.has(course)) {
			for (const nextCourse of graph.get(course)!) {
				preReqCount[nextCourse]--;
				if (preReqCount[nextCourse] === 0) {
					queue.push(nextCourse);
				}
			}
		}
	}

	return count === numCourses;
}

export function findOrder(
	numCourses: number,
	prerequisites: number[][],
): number[] {
	const graph: Map<number, Set<number>> = new Map();
	const preReqCount: Array<number> = Array(numCourses).fill(0);

	for (const [course, preReq] of prerequisites) {
		if (!graph.has(preReq)) {
			graph.set(preReq, new Set());
		}
		graph.get(preReq)!.add(course);
		preReqCount[course]++;
	}
	const queue: Array<number> = [];

	for (let i = 0; i < preReqCount.length; i++) {
		if (preReqCount[i] === 0) {
			queue.push(i);
		}
	}

	const order: Array<number> = [];
	while (queue.length > 0) {
		const course = queue.shift()!;
		order.push(course);
		if (graph.has(course)) {
			for (const nextCourse of graph.get(course)!) {
				preReqCount[nextCourse]--;
				if (preReqCount[nextCourse] === 0) {
					queue.push(nextCourse);
				}
			}
		}
	}

	return order.length === numCourses ? order : [];
}
