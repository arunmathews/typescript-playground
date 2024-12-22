export function convertBase(
	inBase: number,
	inNum: string,
	outBase: number,
): string {
	const decNum = convertToDec(inBase, inNum);
	return convertToBase(outBase, decNum);
}

function convertToDec(inBase: number, inNum: string): number {
	let result = 0;
	for (let i = 0; i < inNum.length; i++) {
		let digit;
		if (inBase > 10) {
			digit = inNum.charCodeAt(i) - "A".charCodeAt(0) + 10;
		} else {
			digit = inNum.charCodeAt(i) - "0".charCodeAt(0);
		}
		result = result * inBase + digit;
	}

	return result;
}

function convertToBase(outBase: number, decNum: number): string {
	let result = "";
	while (decNum) {
		const digit = decNum % outBase;
		if (digit < 10) {
			result = `${digit}${result}`;
		} else {
			result = `${String.fromCharCode("A".charCodeAt(0) + digit - 10)}${result}`;
		}
		decNum = Math.floor(decNum / outBase);
	}

	return result;
}
