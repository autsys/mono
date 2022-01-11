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
    console.log("[Firebase] - Firestore connecting:", {
      firestore,
      host,
      port,
      options,
    });
    isBrowser && connectFirestoreEmulator(firestore, host, port, options);
    console.log("[Firebase] - Firestore connected");
  }
};

export default init;
