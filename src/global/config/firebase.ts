import firebaseAdmin from 'firebase-admin';
import googleService from '../../../writon-firebase-admin.json';

export const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(googleService as firebaseAdmin.ServiceAccount),
});
