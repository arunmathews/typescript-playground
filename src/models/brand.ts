/**
 * Idea from https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
 * also @arun.mathews
 */
/** Used by Brand to mark a type in a readable way. */
interface Branding<BrandT> {
	_type?: BrandT;
}

/** Create a "branded" version of a type. TypeScript will disallow any value that does not have the same brand. */
export type Brand<T, BrandT> = T & Branding<BrandT>;
