import firebase from "firebase/app";
import "firebase/firestore";

export const firestore = firebase.firestore();

const useEmulator = (host: string, port: number) => {
  const isBrowser = typeof window !== "undefined";
  if (
    (isBrowser && location?.hostname === "localhost") ||
    location.hostname === "127.0.0.1" ||
    process.env.FIREBASE_FIRESTORE_EMULATOR === "true"
  ) {
    firestore.useEmulator(host, port);
  }
};

export const init = (
  settings?: firebase.firestore.Settings
): firebase.firestore.Firestore => {
  if (settings) {
    firestore.settings(settings);
    console.log(`[Firebase] - Firestore initialized: ${settings}`);
  } else {
    // env only has strings
    const host = process.env.FIREBASE_FIRESTORE_HOST || "localhost";
    const port =
      (process.env.FIREBASE_FIRESTORE_PORT &&
        parseInt(process.env.FIREBASE_FIRESTORE_PORT)) ||
      9001;
    firestore.settings({
      host: `${host}:${port}`,
      ssl: false,
    });
    useEmulator(host, port);
    console.log(`[Firebase] - Firestore initialized: ${host}:${port}`);
  }
  return firestore;
};

export default init;
