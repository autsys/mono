import firebase from 'firebase/app';
/**
 * Perform a simple query on a Firestore reference
 * @param {object} ref firestore reference
 * @param {array} query array of strings to use for query
 * @returns {Object|null} Object with results {docId: docData} or null
 * https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
 */
export default async function where(
  ref: firebase.firestore.CollectionReference,
  query: readonly [
    string | firebase.firestore.FieldPath,
    firebase.firestore.WhereFilterOp,
    unknown
  ]
): Promise<Record<string, unknown> | null> {
  const querySnapshot = await ref.where(...query).get();
  return handleSuccess(querySnapshot);
}

function handleSuccess(querySnapshot: firebase.firestore.QuerySnapshot) {
  const result: Record<string, unknown> = querySnapshot.docs.reduce(
    (o, data) => {
      const { id, ...rest } = data;
      return { ...o, [id]: { rest } };
    },
    {}
  );
  return Object.entries(result).length > 0 ? result : null;
}
