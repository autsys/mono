import firebase from 'firebase/app';
import 'firebase/storage';

export const storage = firebase.storage();
console.log('[Firebase] - Storage initialized');
