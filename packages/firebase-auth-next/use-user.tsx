import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import "./init-firebase";
import { mapUserData, User } from "./map-user-data";
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from "./user-cookies";

const empty = {
  email: "",
  displayName: "",
  photoURL: "",
  token: "",
  uid: "",
};

type Props = {
  readonly user: User;
  readonly initializing: boolean;
  readonly logout: () => Promise<void>;
};

export const Context = createContext<Props>({
  initializing: true,
  user: empty,
  logout: () => Promise.reject("no user auth provider"),
});

export const Provider = ({
  children,
  route,
}: {
  readonly children: ReactNode;
  readonly route: string;
}): JSX.Element | null => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>(empty);
  const router = useRouter();

  const logout = useCallback(async () => {
    router.push(route);
    await firebase.auth().signOut();
    setUser(empty);
  }, []);

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    if (initializing) {
      const cancelAuthListener = firebase
        .auth()
        .onIdTokenChanged(async (user) => {
          if (user) {
            const userData = await mapUserData(user);
            setUserCookie.run(userData);
            setUser(userData);
          } else {
            removeUserCookie.run("auth");
            setUser(empty);
          }
          setInitializing(false);
        });
      return () => {
        cancelAuthListener();
      };
    }
    return;
  }, [initializing]);

  useEffect(() => {
    const userFromCookie = getUserFromCookie();
    if (userFromCookie) {
      setUser(userFromCookie);
    } else {
      router.push(route);
    }
  }, []);
  if (initializing) {
    return null;
  }

  const context = {
    initializing,
    logout,
    user,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useUser = (): Props => {
  const context = useContext(Context);
  return { ...context };
};

export default useUser;