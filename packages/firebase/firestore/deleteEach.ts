import firebase from 'firebase/app';
/**
 * Remove each document in the given array.
 * @param ref firestore reference
 * @param docs doc ids to remove under ref
 * @returns {object} {results, errors}
 */
export default async function deleteEach(
  ref: firebase.firestore.CollectionReference,
  docs: string[]
) {
  const errors: Error[] = [];
  await Promise.all(
    docs.map(async (id) => {
      try {
        return await ref.doc(id).delete();
      } catch (err) {
        errors.push(err);
      }
    })
  );
  return { errors };
}
