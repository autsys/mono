/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// type Functor<A> = {
// map<U>(f: (x: T) => U): Functor<U>;
// map<B>(transform: (value: A) => B): Functor<B>;
// };
// type Mappable<T> = {
//   readonly map: <R>(fn: (x: T) => R) => Mappable<R>;
//   readonly valueOf: () => T;
// };
// const identity = <T>(value: T): Mappable<T> => ({
//   map: <R>(fn: (x: T) => R): Mappable<R> => identity(fn(value)),
//   valueOf: () => value,
// });
// function map<Input, Output>(
//   arr: readonly Input[],
//   func: (arg: Input) => Output
// ): readonly Output[] {
//   return arr.map(func);
// }
// type G<T> = (x: T) => T;

// export type TEffect<T> = {
// readonly map: <R>(f: <T>(x: T) => R) => TEffect;
// readonly run: <T>(x: T) => T;
// readonly run: () => T;
// };
export function Effect<I, O>(f: (args: I) => O) {
  return {
    // map(g)  {
    //   return Effect((x) => g(f(x)));
    // },
    run: (args: I) => f(args),
    // run(x) {
    //   return f(x);
    // },
  };
}

// Effect.of = function of(val) {
//   return Effect(() => val);
// };
