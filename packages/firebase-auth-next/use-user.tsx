import { FirebaseApp } from "firebase/app";
import { Auth, getAuth, onIdTokenChanged, signOut, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";
import { FirebaseStorage } from "firebase/storage";
import React, {
  createContext,
  FC,
  Context as TContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  readonly user?: User;
  readonly initializing: boolean;
  readonly logout: () => Promise<void>;
};

type Context = {
  context: TContext<{
    app: FirebaseApp;
    firestore: Firestore;
    functions: Functions;
    storage: FirebaseStorage;
  }>;
};

export const Context = createContext<Props>({
  initializing: true,
  user: undefined,
  logout: () => Promise.reject("no user auth provider"),
});

export const Provider: FC<Context> = ({
  context,
  children,
}): JSX.Element | null => {
  const { app } = useContext(context);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();
  const [auth, setAuth] = useState<Auth>();

  const logout = async () => {
    if (auth) {
      await signOut(auth);
      setUser(undefined);
    }
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    if (app) {
      setAuth(getAuth(app));
    }
    return;
  }, [app]);

  useEffect(() => {
    if (auth) {
      const cancelAuthListener = onIdTokenChanged(
        auth,
        (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(undefined);
          }
          setInitializing(false);
        },
        (error) => {
          console.error(error);
        }
      );
      return () => {
        cancelAuthListener();
      };
    }
    return;
  }, [auth]);

  const value = {
    initializing,
    logout,
    user,
  };
  return <Context.Provider {...{ value }}>{children}</Context.Provider>;
};

export const useUser = (): Props => {
  const context = useContext(Context);
  return { ...context };
};

export default useUser;
