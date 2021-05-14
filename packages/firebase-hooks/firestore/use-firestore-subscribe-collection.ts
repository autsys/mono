import firebase from "firebase/app";
import { useEffect, useState } from "react";

/**
 * Subscribe to changes on a Firebase Firestore collection
 * @param {Object} collection - Firebase Firestore collection reference
 */
export default function useSubscribeCollection(
  collection: firebase.firestore.CollectionReference
): {
  data: Record<string, unknown>;
  error: Error | undefined;
} {
  const [data, setData] = useState({});
  const [error, setError] = useState<Error>();
  //subscribe to path changes
  useEffect(() => {
    const onFailure = (err: Error) => {
      setError(err);
    };
    const onSuccess = (
      snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    ) => {
      const results: Record<string, unknown> = {};
      snapshot.docs.forEach((doc) => (results[doc.id] = doc.data()));
      setData(results);
    };
    const unsubscribe = collection.onSnapshot(onSuccess, onFailure);
    return () => unsubscribe();
  }, [collection]);

  return { data, error };
}
