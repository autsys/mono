import 'firebase/auth';
import { ReactNode } from 'react';
import './init-firebase';
export declare const Context: import("react").Context<{
    user: null;
    initializing: null;
    logout: null;
}>;
export declare const Provider: ({ children }: {
    readonly children: ReactNode;
}) => JSX.Element;
export declare const useUser: () => {
    user: null;
    initializing: null;
    logout: null;
};
export default useUser;
