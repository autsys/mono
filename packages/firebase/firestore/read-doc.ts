import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
/**
 * https://firebase.google.com/docs/firestore/quickstart#read_data
 * @param ref firestore reference
 * @returns {Promise} Resolve: docData or undefined if not found
 */
export async function read(
  ref: DocumentReference
): Promise<DocumentData | undefined> {
  const doc = await getDoc(ref);
  const data = doc.data();
  return data;
}

export default read;
