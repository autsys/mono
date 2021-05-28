import firebase from 'firebase/app';

export type User = {
  readonly uid: string;
  readonly email: string | null;
  readonly displayName: string | null;
  readonly photoURL: string | null;
  readonly token: string;
};

export const mapUserData = async (user: firebase.User): Promise<User> => {
  const { uid, email, photoURL, displayName } = user;
  const token = await user.getIdToken(true);
  return {
    uid,
    email,
    displayName,
    photoURL,
    token,
  };
};
