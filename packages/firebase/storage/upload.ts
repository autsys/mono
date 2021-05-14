import firebase from "firebase/app";

import uploadComplete from "./upload-complete";

/**
 * Async upload to Firebase storage
 * @param ref - Firebase storage reference
 * @param file - file contents
 * @param metadata - metadata to change - defaults to
 * ```cacheControl: 'no-cache, max-age=29030400'```
 * @param onChange - function to call on 'state_changed'
 * @returns Promise that resolves on success / rejects on error
 */
export const upload = async (
  ref: firebase.storage.Reference,
  file: Blob | Uint8Array | ArrayBuffer,
  metadata?: firebase.storage.UploadMetadata,
  onChange?: (snapshot: firebase.storage.UploadTaskSnapshot) => void
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const md = {
      cacheControl: "no-cache, max-age=29030400",
    };
    const uploadTask = ref.put(file, metadata || md);
    uploadTask.on(
      "state_changed",
      onChange || null,
      (err) => {
        console.error(err);
        reject("Failed to upload file");
      },
      async () => {
        const url = await uploadComplete(uploadTask);
        resolve(url);
      }
    );
  });

export default upload;
