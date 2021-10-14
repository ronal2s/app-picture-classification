import * as firebase from "firebase";
import "firebase/auth";
import { firebaseConfig } from "../utils/config";

export default class FirebaseController {
  static app() {
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(firebaseConfig);
      return firebase.default;
    } else {
      return firebase.default;
    }
  }
  static getTimestamp(): Object {
    const firebaseController = FirebaseController.app();
    return firebaseController.firestore.FieldValue.serverTimestamp();
  }
}
