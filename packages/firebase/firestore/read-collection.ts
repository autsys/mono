import {
  CollectionReference,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
/**
 * https://firebase.google.com/docs/firestore/quickstart#read_data
 * @param ref firestore collection reference
 */
export default async function read(
  ref: CollectionReference
): Promise<Record<string, Record<string, unknown>> | null> {
  return await getDocs(ref).then(handleSuccess);
}

function handleSuccess(querySnapshot: QuerySnapshot) {
  const result: Record<string, Record<string, unknown>> = {};
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result[doc.id] = data;
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("result", result);
  }
  return Object.entries(result).length > 0 ? result : null;
}
