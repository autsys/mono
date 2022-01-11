import { connectFunctionsEmulator, Functions } from "firebase/functions";

export function init(functions: Functions, host: string, port: number): void {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && process.env.FIREBASE_FUNCTIONS_EMULATOR === "true") {
    console.log("[Firebase] - Functions connecting", { functions, host, port });
    connectFunctionsEmulator(functions, host, port);
    console.log("[Firebase] - Functions connected");
  }
}

export default init;
