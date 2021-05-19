import firebase from "firebase/app";
/**
 * https://firebase.google.com/docs/firestore/quickstart#read_data
 * @param ref firestore reference
 * @returns {Promise} Resolve: docData or undefined if not found
 */
export async function read(
  ref: firebase.firestore.DocumentReference
): Promise<firebase.firestore.DocumentData | undefined> {
  const doc = await ref.get();
  const data = doc.data();
  return data;
}

export default read;
