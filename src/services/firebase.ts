import firebase from 'firebase/app'
import 'firebase/firestore';
import { firebaseConfig } from '../config/firebase-config';


firebase.initializeApp(firebaseConfig)
export class FirebaseServices {
    static readonly db = firebase.firestore();
    static readonly firestore = firebase.firestore

}