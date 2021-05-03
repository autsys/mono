"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Effect(f) {
    return {
        map(g) {
            return Effect((x) => g(f(x)));
        },
        runEffects(x) {
            return f(x);
        },
        join(x) {
            return f(x);
        },
        chain(g) {
            return Effect(f).map(g).join();
        },
    };
}
exports.Effect = Effect;
// Effect.of = function of(val) {
//   return Effect(() => val);
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZFQUE2RTtBQUM3RSxTQUFnQixNQUFNLENBQUMsQ0FBZ0I7SUFDckMsT0FBTztRQUNMLEdBQUcsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxVQUFVLENBQUMsQ0FBQztZQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUM7WUFDTCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBZkQsd0JBZUM7QUFFRCxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCLEtBQUsifQ==