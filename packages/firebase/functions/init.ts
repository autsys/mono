import firebase from "firebase/app";
import "firebase/functions";

export const functions = firebase.functions();

function init(): firebase.functions.Functions {
  const host = process.env.FIREBASE_FUNCTIONS_HOST || "localhost"; //this will set Functions to connect to local emulator
  const port =
    (process.env.FIREBASE_FUNCTIONS_PORT &&
      parseInt(process.env.FIREBASE_FUNCTIONS_PORT)) ||
    5001;
  const isBrowser = typeof window !== "undefined";
  if (
    (isBrowser && location && location.hostname === "localhost") ||
    (isBrowser && location && location.hostname === "127.0.0.1") ||
    process.env.FIREBASE_FUNCTIONS_EMULATOR === "true"
  ) {
    functions.useEmulator(host, port);
  }
  console.log("[Firebase] - Functions initialized: ", host + ":" + port);
  return functions;
}

export default init;
