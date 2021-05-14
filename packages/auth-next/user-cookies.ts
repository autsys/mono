import Cookies from "js-cookie";
import cookies from "js-cookie";

import { Effect } from "./effect";
import { User } from "./map-user-data";

export const get = (key: string): string | undefined => cookies.get(key);

export const getUserFromCookie = (key = "auth"): User | undefined => {
  const auth = get(key);
  return auth && JSON.parse(auth);
};

export const setUserCookie = Effect(
  (user: User, options: Cookies.CookieAttributes = { expires: 1 / 24 }) =>
    cookies.set("auth", user, options)
);

export const removeUserCookie = Effect((key: string) => cookies.remove(key));
