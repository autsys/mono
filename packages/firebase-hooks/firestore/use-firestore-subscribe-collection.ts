import {
  CollectionReference,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type Nested<T> = Record<string, Record<string, T>>;
/**
 * Subscribe to changes on a Firebase Firestore collection
 * @param {Object} collection - Firebase Firestore collection reference
 */
export default function useSubscribeCollection<T>(
  collection: CollectionReference
): {
  data: Nested<T>;
  error: Error | undefined;
} {
  const [data, setData] = useState<Nested<T>>({});
  const [error, setError] = useState<Error>();
  //subscribe to path changes
  useEffect(() => {
    const onFailure = (err: Error) => {
      setError(err);
    };
    const onSuccess = (snapshot: QuerySnapshot<DocumentData>) => {
      const results: Nested<T> = {};
      snapshot.docs.forEach((doc) => (results[doc.id] = doc.data()));
      setData(results);
    };
    const unsubscribe = onSnapshot(collection, onSuccess, onFailure);
    return () => unsubscribe();
  }, [collection]);

  return { data, error };
}
