import firebase from 'firebase/app';
/**
 * https://firebase.google.com/docs/firestore/quickstart#read_data
 * @param {object} ref firestore reference
 */
export default async function read(
  ref: firebase.firestore.CollectionReference
) {
  return await ref.get().then(handleSuccess);
}

function handleSuccess(querySnapshot: firebase.firestore.QuerySnapshot) {
  const result: Record<string, unknown> = {};
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result[doc.id] = data;
  });
  if (process.env.NODE_ENV !== 'production') {
    console.log('result', result);
  }
  return Object.entries(result).length > 0 ? result : null;
}
