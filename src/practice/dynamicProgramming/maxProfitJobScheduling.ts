type Job = {
	start: number;
	end: number;
	profit: number;
};
export function jobScheduling(
	startTime: number[],
	endTime: number[],
	profit: number[],
): number {
	const jobs: Array<Job> = [];
	for (let i = 0; i < startTime.length; i++) {
		jobs.push({ start: startTime[i], end: endTime[i], profit: profit[i] });
	}

	jobs.sort((a, b) => a.end - b.end);

	const dp: Array<number> = Array(jobs.length + 1).fill(0);
	function bisectRight(target: number): number {
		let left = 0,
			right = jobs.length;
		while (left < right) {
			const mid = Math.floor((left + right) / 2);
			if (jobs[mid].end <= target) {
				left = mid + 1;
			} else {
				right = mid;
			}
		}
		return left;
	}

	for (let i = 1; i < dp.length; i++) {
		const { start, profit } = jobs[i];
		const numJobs = bisectRight(start);
		dp[i] = Math.max(dp[i - 1], dp[numJobs] + profit);
	}

	return dp[jobs.length];
}
