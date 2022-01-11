import { connectStorageEmulator, FirebaseStorage } from "firebase/storage";

export function init(
  storage: FirebaseStorage,
  host: string,
  port: number
): void {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && process.env.FIREBASE_STORAGE_EMULATOR === "true") {
    console.log("[Firebase] - Storage connecting", { storage, host, port });
    connectStorageEmulator(storage, host, port);
    console.log("[Firebase] - Storage connected");
  }
}

export default init;
