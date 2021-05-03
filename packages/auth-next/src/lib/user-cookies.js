"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserCookie = exports.setUserCookie = exports.getUserFromCookie = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const effect_1 = require("./effect");
exports.getUserFromCookie = JSON.parse(js_cookie_1.default.get('auth'));
exports.setUserCookie = effect_1.Effect((user) => js_cookie_1.default.set('auth', user, { expires: 1 / 24 }));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.removeUserCookie = effect_1.Effect(js_cookie_1.default.remove('auth'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb29raWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1jb29raWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBEQUFnQztBQUVoQyxxQ0FBa0M7QUFHckIsUUFBQSxpQkFBaUIsR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFFMUQsUUFBQSxhQUFhLEdBQUcsZUFBTSxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FDakQsbUJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztBQUVGLDZFQUE2RTtBQUNoRSxRQUFBLGdCQUFnQixHQUFHLGVBQU0sQ0FBQyxtQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDIn0=