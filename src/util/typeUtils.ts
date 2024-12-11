// User-defined type guards are not safe - https://unsplash.com/blog/user-defined-type-guards-not-safe/
export function is<A, B extends A>(
	fn: (a: A) => B | undefined,
): (a: A) => a is B {
	return (a: A): a is B => typeof fn(a) !== "undefined";
}

//Help typescript to narrow down type - https://fettblog.eu/typescript-hasownproperty/
export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
	obj: X,
	prop: Y,
): obj is X & Record<Y, unknown> {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

//Distribute omit over unions - https://davidgomes.com/pick-omit-over-union-types-in-typescript/
export type DistributiveOmit<T, K extends keyof T> = T extends unknown
	? Omit<T, K>
	: never;
