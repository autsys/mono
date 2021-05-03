import firebase from 'firebase/app';
export declare type User = {
    readonly uid: string;
    readonly email: string | null;
    readonly displayName: string | null;
    readonly photoURL: string | null;
    readonly token: string;
};
export declare const mapUserData: (user: firebase.User) => Promise<User>;
