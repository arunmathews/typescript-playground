import { Result } from "@swan-io/boxed";

import { is } from "./typeUtils.js";

export const isRejected = is<
	PromiseSettledResult<unknown>,
	PromiseRejectedResult
>((promRes) => {
	if (promRes.status === "rejected") {
		return promRes;
	}

	return undefined;
});

export async function doChainPromRes<A>(
	genFn: () => Generator<
		Promise<Result<unknown, unknown>>,
		Promise<Result<A, unknown>>,
		unknown
	>,
): Promise<Result<A, unknown>> {
	const gen = genFn();
	async function step(currVal?: unknown): Promise<Result<A, unknown>> {
		const nextVal = gen.next(currVal);
		if (nextVal.done) {
			return nextVal.value;
		}
		const result = await nextVal.value;
		if (result.isError()) {
			return result as Result<A, unknown>;
		}

		return step(result.get());
	}

	return step(undefined);
}

export function* pickPromRes<A>(
	promResFn: Promise<Result<A, unknown>>,
): Generator<Promise<Result<A, unknown>>, A> {
	return (yield promResFn) as A;
}
