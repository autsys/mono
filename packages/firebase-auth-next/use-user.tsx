import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import "./init-firebase";

type Props = {
  readonly user?: User;
  readonly initializing: boolean;
  readonly logout: () => Promise<void>;
};

export const Context = createContext<Props>({
  initializing: true,
  user: undefined,
  logout: () => Promise.reject("no user auth provider"),
});

export const Provider = ({
  app,
  children,
}: {
  app: FirebaseApp;
  readonly children: ReactNode;
}): JSX.Element | null => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();

  const auth = getAuth(app);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(undefined);
  }, []);

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    if (initializing) {
      const cancelAuthListener = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
        setInitializing(false);
      });
      return () => {
        cancelAuthListener();
      };
    }
    return;
  }, [initializing]);

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
