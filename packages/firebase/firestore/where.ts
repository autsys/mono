import {
  CollectionReference,
  FieldPath,
  getDocs,
  query,
  QuerySnapshot,
  where as w,
  WhereFilterOp,
} from "firebase/firestore";
/**
 * Perform a simple query on a Firestore reference
 * @param ref firestore reference
 * @param query array of values to use for query
 * @returns Object with results {docId: docData} or null
 * https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
 */
export default async function where(
  ref: CollectionReference,
  qs: [string | FieldPath, WhereFilterOp, unknown]
): Promise<Record<string, Record<string, unknown>> | null> {
  const q = query(ref, w(...qs));
  return await getDocs(q).then(handleSuccess);
}

export function handleSuccess(querySnapshot: QuerySnapshot) {
  const result: Record<string, Record<string, unknown>> = {};
  querySnapshot.forEach(function (doc) {
    const data = doc.data();
    result[doc.id] = data;
  });
  return Object.entries(result).length > 0 ? result : null;
}
