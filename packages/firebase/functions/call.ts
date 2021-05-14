import firebase from "firebase/app";
/**
 * Create a function that will call a Firebase onCall
 * function from the client by name
 */
export async function call(
  functions: firebase.functions.Functions,
  name: string,
  options: firebase.functions.HttpsCallableOptions,
  data: unknown
): Promise<firebase.functions.HttpsCallableResult> {
  const callable = functions.httpsCallable(name, options);
  return await callable(data);
}
