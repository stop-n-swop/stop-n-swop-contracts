/** Takes an object type and returns all properties as nested properties as optional */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/** Returns the return type of a promise
 * e.g. Promise<string> -> string
 */
export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

export type MaybePromise<T> = Promise<T> | T;

type Payload = Record<string, unknown>;
export type Signal<T = Payload> = { rayId: string } & T;
export type Message<T = Payload> = Signal<T>;
export type ErrorMessage<T = Payload> = Message<T> & { error: any };

/** Returns a promise that never resolves */
export const never = () =>
  new Promise<never>(() => {
    // !
  });

/** Returns a promise that resolves after a given ms */
export const after = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

/** Returns if a value is "empty"ish
 * The following are considered "empty"
 * null
 * []
 * {}
 * ""
 */
export const isEmpty = (obj: any) => {
  if (obj == null) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  if (typeof obj === 'string') {
    return obj === '';
  }
  return false;
};

/** Reduce an object's entries
 * A reducer fn should transform and concat the entries and return a "final" entries array
 */
export const reduceObj = <T, R = T>(
  obj: T,
  fn: (
    acc: [string | number | symbol, any][],
    key: keyof T,
    value: T[keyof T],
  ) => [string | number | symbol, any][],
): R => {
  const entries = Object.entries(obj) as [keyof T, T[keyof T]][];
  const reduced = entries.reduce(
    (acc, [key, value]) => fn(acc, key, value),
    [] as [string | number | symbol, any][],
  );
  const asObj = Object.fromEntries(reduced);
  return asObj as R;
};

/** Maps over the entries of an object
 * The map fn should return a key/value tuple
 * This allows you to map both the values and the keys
 */
export const mapObj = <T, R = T>(
  obj: T,
  fn: (key: keyof T, value: T[keyof T]) => [string | number | symbol, any],
): R => {
  return reduceObj(obj, (acc, key, value) => {
    return [...acc, fn(key, value)];
  });
};

/** Filters properties of an object */
export const filterObj = <T, R = T>(
  obj: T,
  fn: (key: keyof T, value: T[keyof T]) => boolean,
): R => {
  return reduceObj(obj, (acc, key, value) => {
    if (fn(key, value)) {
      return [...acc, [key, value]];
    }
    return acc;
  });
};

/** Omits specific keys from an object */
export const omit = <T extends Record<string, any>, S extends keyof T>(
  obj: T,
  keys: S[],
): Omit<T, S> => {
  return filterObj(obj, (key) => !keys.includes(key as any));
};

/** Takes an array (of primitives) and returns an array with only unique elements */
export const unique = <T>(arr: T[]) => {
  return [...new Set<T>(arr)];
};

/** Takes an object and removes any properties that are null/undefined */
export const omitNullProperties = <T>(obj: T): T => {
  return filterObj(obj, (_key, value) => value != null);
};

/** Takes an object and removes any properties that are emptyish */
export const omitEmptyProperties = <T>(obj: T): T => {
  return filterObj(obj, (_key, value) => !isEmpty(value));
};

/** Sorts a list by applying fn to each element to get a primitive */
export const sortBy = <T>(
  list: T[],
  fn: (t: T) => any,
  direction: 'asc' | 'desc' = 'asc',
) => {
  return list.slice().sort((a, b) => {
    const x = fn(a);
    const y = fn(b);

    if (direction === 'asc') {
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    }
    if (direction === 'desc') {
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    }
    return 0;
  });
};

/** Returns true if a value is a number or a numberic string */
export const isNumeric = (x: string | number) => {
  return x != null && !Number.isNaN(Number(x));
};

/** Resolves a promise as a tuple: [error, result] */
export const t = <T>(p: Promise<T>): Promise<[any, T]> => {
  return p.then(
    (result) => {
      return [undefined, result] as [any, T];
    },
    (err) => {
      return [err, undefined] as unknown as [any, T];
    },
  );
};

type Functor<T, R> = (t: T) => R;

function pipe<T, R>(...fns: [Functor<T, R>]): Functor<T, R>;
function pipe<T, U, R>(...fns: [Functor<T, U>, Functor<U, R>]): Functor<T, R>;
function pipe<T, U, V, R>(
  ...fns: [Functor<T, U>, Functor<U, V>, Functor<V, R>]
): Functor<T, R>;
function pipe<T, U, V, W, R>(
  ...fns: [Functor<T, U>, Functor<U, V>, Functor<V, W>, Functor<W, R>]
): Functor<T, R>;
function pipe<T, U, V, W, X, R>(
  ...fns: [
    Functor<T, U>,
    Functor<U, V>,
    Functor<V, W>,
    Functor<W, X>,
    Functor<X, R>,
  ]
): Functor<T, R>;
function pipe(...fns: Array<(t: any) => any>) {
  return (t: any) => fns.reduce((t, fn) => fn(t), t);
}

export { pipe };

function pipeAsync<T, R>(
  ...fns: [Functor<T, MaybePromise<R>>]
): Functor<T, Promise<R>>;
function pipeAsync<T, U, R>(
  ...fns: [Functor<T, MaybePromise<U>>, Functor<U, MaybePromise<R>>]
): Functor<T, Promise<R>>;
function pipeAsync<T, U, V, R>(
  ...fns: [
    Functor<T, MaybePromise<U>>,
    Functor<U, MaybePromise<V>>,
    Functor<V, MaybePromise<R>>,
  ]
): Functor<T, Promise<R>>;
function pipeAsync<T, U, V, W, R>(
  ...fns: [
    Functor<T, MaybePromise<U>>,
    Functor<U, MaybePromise<V>>,
    Functor<V, MaybePromise<W>>,
    Functor<W, R>,
  ]
): Functor<T, Promise<R>>;
function pipeAsync(...fns: Array<(t: any) => any>) {
  return async (t: any) => {
    return fns.reduce(async (p, fn) => {
      return fn(await p);
    }, Promise.resolve(t));
  };
}

export { pipeAsync };

/** Reduces an array where the functor returns a promise */
export const reduceAsync = <T, R>(
  arr: T[],
  fn: (acc: R, v: T, i: number, arr: T[]) => Promise<R>,
  initial: R,
): Promise<R> => {
  return arr.reduce(async (acc, v, i, arr) => {
    return fn(await acc, v, i, arr);
  }, Promise.resolve(initial));
};

/** Maps over an array with a promise-resolving functor */
export function mapAsync<T, R>(
  arr: T[],
  fn: (v: T, i: number, arr: T[]) => Promise<R>,
): Promise<R[]> {
  return Promise.all(arr.map(fn));
}

/** Does an async map over an array but resolves each element before moving on to the next */
export async function mapSync<T, R>(
  arr: T[],
  fn: (v: T, i: number, arr: T[]) => Promise<R>,
): Promise<R[]> {
  return reduceAsync(
    arr,
    async (acc, v, i, arr) => {
      return [...acc, await fn(v, i, arr)];
    },
    [],
  );
}

/** Filters elements in an array based on an async functor */
export async function filterAsync<T>(
  arr: T[],
  fn: (v: T, i: number, arr: T[]) => Promise<boolean>,
): Promise<T[]> {
  const els = await Promise.all(
    arr.map(async (v, i, arr) => {
      const check = await fn(v, i, arr);
      return { v, check };
    }),
  );

  const result: T[] = [];

  els.forEach(({ check, v }) => {
    if (check) {
      result.push(v);
    }
  });

  return result;
}

export async function forEachAsync<T>(
  arr: T[],
  fn: (v: T, i: number, arr: T[]) => Promise<any>,
): Promise<void> {
  await mapAsync(arr, fn);
}
