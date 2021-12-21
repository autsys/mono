import {
  connectFirestoreEmulator,
  EmulatorMockTokenOptions,
  Firestore,
} from "firebase/firestore";

export const init = (
  firestore: Firestore,
  host: string,
  port: number,
  options?:
    | { mockUserToken?: string | EmulatorMockTokenOptions | undefined }
    | undefined
): void => {
  // env only has strings
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && process.env.FIREBASE_FIRESTORE_EMULATOR === "true") {
    isBrowser && connectFirestoreEmulator(firestore, host, port, options);
    console.log(`[Firebase] - Firestore emulator connected: ${host}:${port}`);
  }
};

export default init;
