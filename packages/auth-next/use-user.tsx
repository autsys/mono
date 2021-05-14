/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// import { Effect } from './effect';
import './init-firebase';
import { mapUserData, User } from './map-user-data';
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from './user-cookies';

const empty = {
  email: '',
  displayName: '',
  photoURL: '',
  token: '',
  uid: '',
};

type Props = {
  readonly user: User;
  readonly initializing: boolean;
  // readonly logout?: Promise;
};

export const Context = createContext<Props>({
  initializing: true,
  user: empty,
});

export const Provider = ({
  children,
}: {
  readonly children: ReactNode;
}): JSX.Element => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>(empty);
  const router = useRouter();

  const logout = useCallback(async () => {
    router.push('/auth');
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
            removeUserCookie.run('auth');
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
      router.push('/auth');
    }
  });

  // if (initializing) {
  //   return null;
  // }

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
