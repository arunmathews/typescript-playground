export function search(nums: number[], target: number): number {
	let left = 0,
		right = nums.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] === target) {
			return mid;
		}
		if (nums[left] <= nums[mid]) {
			if (nums[left] <= target && target < nums[mid]) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		} else {
			if (nums[mid] < target && nums[right] >= target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
	}

	return -1;
}

export function findRotationIndex(nums: number[]): number {
	let left = 0;
	let right = nums.length - 1;
	if (nums[left] <= nums[right]) {
		return 0;
	}
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (mid < nums.length - 1 && nums[mid] > nums[mid + 1]) {
			return mid + 1;
		}
		if (mid > 0 && nums[mid] < nums[mid - 1]) {
			return mid - 1;
		}
		if (nums[mid] > nums[0]) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return 0;
}
