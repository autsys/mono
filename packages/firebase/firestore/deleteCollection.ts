// import firebase from 'firebase/app';
// /**
//  * To delete an entire collection or subcollection in Cloud Firestore,
//  * retrieve all the documents within the collection or subcollection and delete them.
//  * https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
//  * @param collectionRef firestore reference
//  * @param batchSize
//  */
// export default async function deleteCollection(
//   collectionRef: firebase.firestore.CollectionReference,
//   batchSize: number
// ) {
//   const db = collectionRef.firestore;
//   if (!db) {
//     throw new Error(
//       'Firestore db missing! Required prop .firestore or ._firestore on collectionRef'
//     );
//   }
//   const query = collectionRef.orderBy('__name__').limit(batchSize);

//   return await deleteQueryBatch(db, query);
// }

// async function deleteDocs(db, snapshot) {
//   // Delete documents in a batch
//   let batch = db.batch();
//   snapshot.docs.forEach((doc) => {
//     batch.delete(doc.ref);
//   });

//   await batch.commit();
//   return snapshot.size;
// }

// async function deleteQueryBatch(
//   db: firebase.firestore.Firestore,
//   query: firebase.firestore.Query<firebase.firestore.DocumentData>
// ) {
//   const snapshot = await query.get();
//   // When there are no documents left, we are done
//   return snapshot.size === 0 ? 0 : await deleteDocs(db, snapshot);

//   // Recurse on the next process tick, to avoid
//   // exploding the stack.
//   // process.nextTick(() => {
//   //   deleteQueryBatch(db, query);
//   // });
// }
