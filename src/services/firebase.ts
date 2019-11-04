import firebase from 'firebase/app'
import 'firebase/firestore';
import { firebaseConfig } from '../config/firebase-config';


firebase.initializeApp(firebaseConfig)
export class FirebaseServices {
    static readonly db = firebase.firestore()
    static readonly firestore = firebase.firestore

    /**
     * general
     * @returns LV1 SubCollection Ref
     */
    public static generalLV1SubCollectionRef(collection: string, doc: string, subCollection: string ): firebase.firestore.CollectionReference {
        return FirebaseServices.db.collection(collection).doc(doc).collection(subCollection)
    }

    

}