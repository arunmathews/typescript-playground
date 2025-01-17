export function esreMatcher(s: string, r: string): boolean {
	if (r.length === 0) {
		return s.length === 0;
	}
	const firstCharMatch = s.length > 0 && (s[0] === r[0] || r[0] === ".");
	if (r.length > 1 && r[1] === "*") {
		return (
			(firstCharMatch && esreMatcher(s.slice(1), r)) ||
			esreMatcher(s, r.slice(2))
		);
	} else {
		return firstCharMatch && esreMatcher(s.slice(1), r.slice(1));
	}
}
