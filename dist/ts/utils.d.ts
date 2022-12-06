/** Takes an object type and returns all properties as nested properties as optional */
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
/** Returns the return type of a promise
 * e.g. Promise<string> -> string
 */
export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
export type MaybePromise<T> = Promise<T> | T;
/** Returns a promise that never resolves */
export declare const never: () => Promise<never>;
/** Returns a promise that resolves after a given ms */
export declare const after: (ms: number) => Promise<void>;
/** Returns if a value is "empty"ish
 * The following are considered "empty"
 * null
 * []
 * {}
 * ""
 */
export declare const isEmpty: (obj: any) => boolean;
/** Reduce an object's entries
 * A reducer fn should transform and concat the entries and return a "final" entries array
 */
export declare const reduceObj: <T, R = T>(obj: T, fn: (acc: [string | number | symbol, any][], key: keyof T, value: T[keyof T]) => [string | number | symbol, any][]) => R;
/** Maps over the entries of an object
 * The map fn should return a key/value tuple
 * This allows you to map both the values and the keys
 */
export declare const mapObj: <T, R = T>(obj: T, fn: (key: keyof T, value: T[keyof T]) => [string | number | symbol, any]) => R;
/** Filters properties of an object */
export declare const filterObj: <T, R = T>(obj: T, fn: (key: keyof T, value: T[keyof T]) => boolean) => R;
/** Omits specific keys from an object */
export declare const omit: <T extends Record<string, any>, S extends keyof T>(obj: T, keys: S[]) => Omit<T, S>;
/** Takes an array (of primitives) and returns an array with only unique elements */
export declare const unique: <T>(arr: T[]) => T[];
/** Takes an object and removes any properties that are null/undefined */
export declare const omitNullProperties: <T>(obj: T) => T;
/** Takes an object and removes any properties that are emptyish */
export declare const omitEmptyProperties: <T>(obj: T) => T;
/** Sorts a list by applying fn to each element to get a primitive */
export declare const sortBy: <T>(list: T[], fn: (t: T) => any, direction?: 'asc' | 'desc') => T[];
/** Returns true if a value is a number or a numberic string */
export declare const isNumeric: (x: string | number) => boolean;
/** Resolves a promise as a tuple: [error, result] */
export declare const t: <T>(p: Promise<T>) => Promise<[any, T]>;
type Functor<T, R> = (t: T) => R;
declare function pipe<T, R>(...fns: [Functor<T, R>]): Functor<T, R>;
declare function pipe<T, U, R>(...fns: [Functor<T, U>, Functor<U, R>]): Functor<T, R>;
declare function pipe<T, U, V, R>(...fns: [Functor<T, U>, Functor<U, V>, Functor<V, R>]): Functor<T, R>;
declare function pipe<T, U, V, W, R>(...fns: [Functor<T, U>, Functor<U, V>, Functor<V, W>, Functor<W, R>]): Functor<T, R>;
declare function pipe<T, U, V, W, X, R>(...fns: [
    Functor<T, U>,
    Functor<U, V>,
    Functor<V, W>,
    Functor<W, X>,
    Functor<X, R>
]): Functor<T, R>;
export { pipe };
declare function pipeAsync<T, R>(...fns: [Functor<T, MaybePromise<R>>]): Functor<T, Promise<R>>;
declare function pipeAsync<T, U, R>(...fns: [Functor<T, MaybePromise<U>>, Functor<U, MaybePromise<R>>]): Functor<T, Promise<R>>;
declare function pipeAsync<T, U, V, R>(...fns: [
    Functor<T, MaybePromise<U>>,
    Functor<U, MaybePromise<V>>,
    Functor<V, MaybePromise<R>>
]): Functor<T, Promise<R>>;
declare function pipeAsync<T, U, V, W, R>(...fns: [
    Functor<T, MaybePromise<U>>,
    Functor<U, MaybePromise<V>>,
    Functor<V, MaybePromise<W>>,
    Functor<W, R>
]): Functor<T, Promise<R>>;
export { pipeAsync };
/** Reduces an array where the functor returns a promise */
export declare const reduceAsync: <T, R>(arr: T[], fn: (acc: R, v: T, i: number, arr: T[]) => Promise<R>, initial: R) => Promise<R>;
/** Maps over an array with a promise-resolving functor */
export declare function mapAsync<T, R>(arr: T[], fn: (v: T, i: number, arr: T[]) => Promise<R>): Promise<R[]>;
/** Does an async map over an array but resolves each element before moving on to the next */
export declare function mapSync<T, R>(arr: T[], fn: (v: T, i: number, arr: T[]) => Promise<R>): Promise<R[]>;
/** Filters elements in an array based on an async functor */
export declare function filterAsync<T>(arr: T[], fn: (v: T, i: number, arr: T[]) => Promise<boolean>): Promise<T[]>;
export declare function forEachAsync<T>(arr: T[], fn: (v: T, i: number, arr: T[]) => Promise<any>): Promise<void>;
