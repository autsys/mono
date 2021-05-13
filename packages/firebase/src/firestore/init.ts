import firebase from 'firebase/app';
import 'firebase/firestore';

export const firestore = firebase.firestore();

export const init = (
  settings: firebase.firestore.Settings
): firebase.firestore.Firestore => {
  // const local = process.env.LOCAL === 'true'; //this will set Firestore to connect to local emulator
  if (settings) {
    firestore.settings(settings);
    console.log(`[Firebase] - Firestore settings: ${settings}`);
  } else {
    // env only has strings
    const host = process.env.FIRESTORE_HOST || 'localhost';
    const port = process.env.FIRESTORE_PORT || 9001;
    firestore.settings({
      host: `${host}:${port}`,
      ssl: false,
    });
    console.log(`[Firebase] - Firestore settings: ${host}:${port}`);
  }
  return firestore;
};

export default init;
