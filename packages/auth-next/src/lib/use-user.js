"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = exports.Provider = exports.Context = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
const app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
const router_1 = require("next/router");
const react_1 = require("react");
const effect_1 = require("./effect");
require("./init-firebase");
const map_user_data_1 = require("./map-user-data");
const user_cookies_1 = require("./user-cookies");
const empty = {
    email: null,
    displayName: null,
    photoURL: null,
    token: null,
    uid: null,
};
exports.Context = react_1.createContext({
    user: null,
    initializing: null,
    logout: null,
});
exports.Provider = ({ children }) => {
    const [initializing, setInitializing] = react_1.useState(true);
    const [user, setUser] = react_1.useState(empty);
    const router = router_1.useRouter();
    const logout = effect_1.Effect(async () => {
        router.push('/auth');
        await app_1.default.auth().signOut();
        setUser(empty);
    });
    react_1.useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        if (initializing) {
            const cancelAuthListener = app_1.default
                .auth()
                .onIdTokenChanged(async (user) => {
                if (user) {
                    const userData = await map_user_data_1.mapUserData(user);
                    user_cookies_1.setUserCookie.runEffects(userData);
                    setUser(userData);
                }
                else {
                    user_cookies_1.removeUserCookie.runEffects(null);
                    setUser(empty);
                }
                setInitializing(false);
            });
            return () => {
                cancelAuthListener();
            };
        }
        const userFromCookie = user_cookies_1.getUserFromCookie;
        if (!userFromCookie) {
            router.push('/auth');
            return null;
        }
        setUser(userFromCookie);
        setInitializing(false);
        return null;
    }, [initializing]);
    // if (initializing) {
    //   return null;
    // }
    const context = {
        initializing,
        logout,
        user,
    };
    return React.createElement(exports.Context.Provider, { value: context }, children);
};
exports.useUser = () => {
    const context = react_1.useContext(exports.Context);
    return Object.assign({}, context);
};
exports.default = exports.useUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2UtdXNlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0VBQXNFO0FBQ3RFLHFEQUFxRDtBQUNyRCx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBQ3hELHVEQUFvQztBQUNwQyx5QkFBdUI7QUFDdkIsd0NBQXdDO0FBQ3hDLGlDQU1lO0FBRWYscUNBQWtDO0FBQ2xDLDJCQUF5QjtBQUN6QixtREFBb0Q7QUFDcEQsaURBSXdCO0FBTXhCLE1BQU0sS0FBSyxHQUFHO0lBQ1osS0FBSyxFQUFFLElBQUk7SUFDWCxXQUFXLEVBQUUsSUFBSTtJQUNqQixRQUFRLEVBQUUsSUFBSTtJQUNkLEtBQUssRUFBRSxJQUFJO0lBQ1gsR0FBRyxFQUFFLElBQUk7Q0FDVixDQUFDO0FBQ1csUUFBQSxPQUFPLEdBQUcscUJBQWEsQ0FBQztJQUNuQyxJQUFJLEVBQUUsSUFBSTtJQUNWLFlBQVksRUFBRSxJQUFJO0lBQ2xCLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQyxDQUFDO0FBRVUsUUFBQSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBb0MsRUFBRSxFQUFFO0lBQ3pFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGdCQUFRLENBQU8sS0FBSyxDQUFDLENBQUM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsa0JBQVMsRUFBRSxDQUFDO0lBRTNCLE1BQU0sTUFBTSxHQUFHLGVBQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sYUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILGlCQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsaURBQWlEO1FBQ2pELGdEQUFnRDtRQUNoRCx1QkFBdUI7UUFDdkIsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxrQkFBa0IsR0FBRyxhQUFRO2lCQUNoQyxJQUFJLEVBQUU7aUJBQ04sZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUMvQixJQUFJLElBQUksRUFBRTtvQkFDUixNQUFNLFFBQVEsR0FBRyxNQUFNLDJCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLDRCQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLCtCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjtnQkFDRCxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPLEdBQUcsRUFBRTtnQkFDVixrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQztTQUNIO1FBQ0QsTUFBTSxjQUFjLEdBQUcsZ0NBQWlCLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEIsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVuQixzQkFBc0I7SUFDdEIsaUJBQWlCO0lBQ2pCLElBQUk7SUFFSixNQUFNLE9BQU8sR0FBRztRQUNkLFlBQVk7UUFDWixNQUFNO1FBQ04sSUFBSTtLQUNMLENBQUM7SUFDRixPQUFPLG9CQUFDLGVBQU8sQ0FBQyxRQUFRLElBQUMsS0FBSyxFQUFFLE9BQU8sSUFBRyxRQUFRLENBQW9CLENBQUM7QUFDekUsQ0FBQyxDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFO0lBQzFCLE1BQU0sT0FBTyxHQUFHLGtCQUFVLENBQUMsZUFBTyxDQUFDLENBQUM7SUFDcEMseUJBQVksT0FBTyxFQUFHO0FBQ3hCLENBQUMsQ0FBQztBQUVGLGtCQUFlLGVBQU8sQ0FBQyJ9