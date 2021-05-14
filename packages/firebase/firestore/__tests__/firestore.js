import {
  deleteCollection,
  deleteEach,
  readCollection,
  readDoc,
  where,
} from "..";
const fs = require("fs");
const firebase = require("@firebase/testing");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "firestore-emulator-example";
const firebasePort = require("../../../firebase.json").emulators.firestore.port;
const port = firebasePort /** Exists? */ ? firebasePort : 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync("firestore.rules", "utf8");

const testCollection = "/users/alice/test";

// /*
//  * ============
//  *  Test Cases
//  * ============
//  */
beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

test("require users to log in before creating a profile", async () => {
  const db = authedApp(null);
  const profile = db.collection("users").doc("alice");
  await firebase.assertFails(profile.set({ birthday: "January 1" }));
});

test("can save file to firestore", async () => {
  const db = authedApp({ uid: "alice" });
  const ref = db.collection(testCollection);
  await addUserDoc(ref);
});
test("can read collection from firestore", async () => {
  const db = authedApp({ uid: "alice" });
  const ref = db.collection(testCollection);
  await addUserDoc(ref);
  const result = await readCollection(ref);
  expect(result).toBeTruthy();
});
test("can delete collection", async () => {
  const db = authedApp({ uid: "alice" });
  const ref = db.collection(testCollection);
  await addUserDoc(ref);
  await deleteCollection(ref, 1);
  const result = await readCollection(ref);
  expect(result).toBeFalsy();
});
test("can delete single document", async () => {
  const db = authedApp({ uid: "alice" });
  const ref = db.collection(testCollection);
  const docRef = await addUserDoc(ref);
  expect(docRef).toBeTruthy();
  await ref.doc(docRef.id).delete();
  const result = await readDoc(ref.doc(docRef.id));
  expect(result).toBeFalsy();
});
test("Can delete array of documents", async () => {
  const db = authedApp({ uid: "alice" });
  const ref = db.collection(testCollection);
  await Promise.all([1, 2, 3].map(async (i) => await addUserDoc(ref)));
  const result = await readCollection(ref);
  expect(Object.entries(result)).toHaveLength(3);
  await deleteEach(ref, Object.keys(result));
  const afterRemove = await readCollection(ref);
  expect(afterRemove).toBeFalsy();
});
test("Can query documents using where", async () => {
  const db = authedApp({ uid: "alice" });
  const ref = db.collection(testCollection);
  await addUserDoc(ref, { name: "test1" });
  await addUserDoc(ref, { name: "test2" });
  await addUserDoc(ref, { name: "test2" });
  const result1 = await where(ref, ["name", "==", "test1"]);
  const result2 = await where(ref, ["name", "==", "test2"]);
  expect(Object.entries(result1)).toHaveLength(1);
  expect(Object.entries(result2)).toHaveLength(2);
});

async function addUserDoc(
  ref,
  data = {
    first: "hello",
    last: "world",
  }
) {
  return await ref.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}
