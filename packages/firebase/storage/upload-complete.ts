import firebase from "firebase/app";
/**
 * Get the download url of a completed upload task
 * @param uploadTask - Firebase storage upload task
 * @returns resolves to a url or rejects if error / not-found
 */
export default async function uploadComplete(
  uploadTask: firebase.storage.UploadTask
): Promise<string> {
  // Upload completed successfully, now we can get the download URL
  const downloadURL: string = await uploadTask.snapshot.ref.getDownloadURL();
  return downloadURL;
}
