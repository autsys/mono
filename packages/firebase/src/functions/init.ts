import firebase from 'firebase/app';
import 'firebase/functions';

export const functions = firebase.functions();

// const errors = {
//   no_host: 'Missing process.env.FIREBASE_FUNCTIONS_HOST',
//   no_port: 'Missing process.env.FIREBASE_FUNCTIONS_PORT',
// };

function init() {
  // const host = process.env.FIREBASE_FUNCTIONS_HOST; //this will set Functions to connect to local emulator
  // const port =
  //   process.env.FIREBASE_FUNCTIONS_PORT &&
  //   parseInt(process.env.FIREBASE_FUNCTIONS_PORT);
  // if (!host) {
  //   return new Error(errors.no_host);
  // }
  // if (!port) {
  //   return new Error(errors.no_port);
  // }
  const isBrowser = typeof window !== 'undefined';
  if (
    (isBrowser && location?.hostname === 'localhost') ||
    location.hostname === '127.0.0.1'
  ) {
    // functions.useEmulator(host, port);
  }
  // console.log('[Firebase] - Functions initialized: ', host + ':' + port);
  return functions;
}

export default init;
