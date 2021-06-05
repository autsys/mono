import firebase from "firebase/app";
import "firebase/storage";

export const storage = firebase.storage();
console.log("[Firebase] - Storage initialized");

export function init(): firebase.storage.Storage {
  const host = process.env.FIREBASE_STORAGE_HOST || "localhost";
  const port =
    (process.env.FIREBASE_STORAGE_PORT &&
      parseInt(process.env.FIREBASE_STORAGE_PORT)) ||
    9199;
  const isBrowser = typeof window !== "undefined";
  if (
    (isBrowser && location && location.hostname === "localhost") ||
    (isBrowser && location && location.hostname === "127.0.0.1") ||
    process.env.FIREBASE_STORAGE_EMULATOR === "true"
  ) {
    console.log("[Firebase] - Storage initialized: ", host + ":" + port);
    storage.useEmulator(host, port);
  }
  return storage;
}

export default init;
