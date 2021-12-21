import { connectFunctionsEmulator, Functions } from "firebase/functions";

export function init(functions: Functions, host: string, port: number): void {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && process.env.FIREBASE_FUNCTIONS_EMULATOR === "true") {
    connectFunctionsEmulator(functions, host, port);
    console.log(
      "[Firebase] - Functions emulator connected: ",
      host + ":" + port
    );
  }
}

export default init;
