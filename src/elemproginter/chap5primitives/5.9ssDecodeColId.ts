export function ssDecodeColId(colId: string): number {
	let result = 0;
	for (let i = 0; i < colId.length; i++) {
		result = result * 26 + colId.charCodeAt(i) - "A".charCodeAt(0) + 1;
	}

	return result;
}
