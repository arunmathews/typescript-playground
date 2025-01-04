import { Option } from "@swan-io/boxed";
import { pop, push, Stack } from "../dataTypes/stack";

export function evaluateRPNString(s: string): Option<number> {
	const stack: Stack<number> = {
		items: [],
	};

	const tokens = s.split(",");
	let index = 0;
	while (index < tokens.length) {
		const thisToken = tokens.at(index);
		if (thisToken != null) {
			const maybeNumber = Number(thisToken);
			if (isFinite(maybeNumber)) {
				push(stack, maybeNumber);
			} else {
				const num1 = pop(stack);
				const num2 = pop(stack);
				if (num1 != null && num2 != null) {
					switch (thisToken) {
						case "+": {
							const res = num1 + num2;
							push(stack, res);
							break;
						}
						case "-": {
							const res = num1 - num2;
							push(stack, res);
							break;
						}
						case "x": {
							const res = num1 * num2;
							push(stack, res);
							break;
						}
						case "/": {
							const res = num1 / num2;
							push(stack, res);
							break;
						}
						default: {
							throw new Error("Unknown character");
						}
					}
				}
			}
		}
		index++;
	}

	const final = pop(stack);

	return Option.fromNullable(final);
}
