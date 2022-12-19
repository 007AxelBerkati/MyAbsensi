import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export const login = (email: string, pass: string) =>
  auth().signInWithEmailAndPassword(email, pass);

export const forgetPassword = (email: string) =>
  auth().sendPasswordResetEmail(email);

export const signOut = () => auth().signOut();

export const databaseRef = () =>
  firebase
    .app()
    .database(
      'https://my-absensi-2-default-rtdb.asia-southeast1.firebasedatabase.app/'
    );

// COLLECTION USERS
export const usersRef = () => firestore().collection('users');
