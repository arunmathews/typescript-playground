export function reverseWords(s: string): string {
	return s.split(" ").reverse().join(" ");
}

export function reverseWords2(s: string): string {
	console.log(s);
	const space1 = s.indexOf(" ");
	if (space1 === -1) {
		return s;
	}
	const rest = reverseWords2(s.substring(space1 + 1));
	const first = s.substring(0, space1);

	return `${rest} ${first}`;
}
