import { CollectionReference, deleteDoc, doc } from "firebase/firestore";
/**
 * Remove each document in the given array.
 * @param ref firestore reference
 * @param docs doc ids to remove under ref
 * @returns {object} {results, errors}
 */
export default async function deleteEach(
  ref: CollectionReference,
  docs: string[]
): Promise<{
  errors: unknown[];
}> {
  const errors: unknown[] = [];
  await Promise.all(
    docs.map(async (id) => {
      try {
        return await deleteDoc(doc(ref, id));
      } catch (err) {
        errors.push(err);
      }
    })
  );
  return { errors };
}
