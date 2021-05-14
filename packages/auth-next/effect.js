"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
// export type TEffect<T> = {
// readonly map: <R>(f: <T>(x: T) => R) => TEffect;
// readonly run: <T>(x: T) => T;
// readonly run: () => T;
// };
function Effect(f) {
    return {
        // map(g)  {
        //   return Effect((x) => g(f(x)));
        // },
        run: (args) => f(args),
    };
}
exports.Effect = Effect;
// Effect.of = function of(val) {
//   return Effect(() => val);
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzRUFBc0U7QUFDdEUsc0JBQXNCO0FBQ3RCLHNDQUFzQztBQUN0QyxrREFBa0Q7QUFDbEQsS0FBSztBQUNMLHVCQUF1QjtBQUN2Qix1REFBdUQ7QUFDdkQsK0JBQStCO0FBQy9CLEtBQUs7QUFDTCxvREFBb0Q7QUFDcEQsbUVBQW1FO0FBQ25FLDBCQUEwQjtBQUMxQixNQUFNO0FBQ04sK0JBQStCO0FBQy9CLDJCQUEyQjtBQUMzQixpQ0FBaUM7QUFDakMseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQixJQUFJO0FBQ0osMkJBQTJCOzs7QUFFM0IsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxnQ0FBZ0M7QUFDaEMseUJBQXlCO0FBQ3pCLEtBQUs7QUFDTCxTQUFnQixNQUFNLENBQU8sQ0FBaUI7SUFDNUMsT0FBTztRQUNMLFlBQVk7UUFDWixtQ0FBbUM7UUFDbkMsS0FBSztRQUNMLEdBQUcsRUFBRSxDQUFDLElBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUkxQixDQUFDO0FBQ0osQ0FBQztBQVZELHdCQVVDO0FBRUQsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5QixLQUFLIn0=