import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.auth();

export function init(): firebase.auth.Auth {
  const host = process.env.FIREBASE_AUTH_HOST || "localhost";
  const port =
    (process.env.FIREBASE_AUTH_PORT &&
      parseInt(process.env.FIREBASE_AUTH_PORT)) ||
    9099;
  const isBrowser = typeof window !== "undefined";
  if (
    (isBrowser && location && location.hostname === "localhost") ||
    (isBrowser && location && location.hostname === "127.0.0.1") ||
    process.env.FIREBASE_AUTH_EMULATOR === "true"
  ) {
    auth.useEmulator(`${host}:${port}`);
  }
  console.log("[Firebase] - Auth initialized: ", host + ":" + port);
  return auth;
}

export default init;
