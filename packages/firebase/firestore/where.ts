import firebase from "firebase/app";
/**
 * Perform a simple query on a Firestore reference
 * @param {object} ref firestore reference
 * @param {array} query array of strings to use for query
 * @returns {Object|null} Object with results {docId: docData} or null
 * https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
 */
export default function where(
  ref: firebase.firestore.CollectionReference,
  query: [
    string | firebase.firestore.FieldPath,
    firebase.firestore.WhereFilterOp,
    unknown
  ]
): Promise<Record<string, unknown> | null> {
  return ref
    .where(...query)
    .get()
    .then(handleSuccess);
}

function handleSuccess(querySnapshot: firebase.firestore.QuerySnapshot) {
  const result: Record<string, unknown> = {};
  querySnapshot.forEach(function (doc) {
    const data = doc.data();
    result[doc.id] = data;
  });
  return Object.entries(result).length > 0 ? result : null;
}
