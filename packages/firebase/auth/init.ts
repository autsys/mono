import { Auth, connectAuthEmulator } from "firebase/auth";

export function init(
  auth: Auth,
  url: string,
  options?: { disableWarnings: boolean } | undefined
): void {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && process.env.FIREBASE_AUTH_EMULATOR === "true") {
    connectAuthEmulator(auth, url, options);
    console.log("[Firebase] - Auth emulator connected: ", url);
  }
}

export default init;
