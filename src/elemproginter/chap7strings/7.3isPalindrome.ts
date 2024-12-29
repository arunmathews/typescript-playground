export function isPalindrome(s: string): boolean {
	let fromLeft = 0;
	let fromRight = s.length - 1;
	while (fromLeft < fromRight) {
		if (s.charAt(fromLeft) === s.charAt(fromRight)) {
			fromLeft++;
			fromRight--;
			continue;
		}
		return false;
	}

	return true;
}
