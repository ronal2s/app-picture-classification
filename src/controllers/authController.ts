import "firebase/auth";
import FirebaseController from "./firebaseController";
const firebase = FirebaseController.app();

export default class AuthController {
  static auth(): firebase.default.auth.Auth {
    return firebase?.auth();
  }

  static async verifiedPhoneNumber(
    phoneNumber: string,
    recaptchaVerifier: any
  ) {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    return await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      // @ts-ignore
      recaptchaVerifier.current
    );
  }

  static async confirmOTP(verificationId: string, verificationCode: string) {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    const authResult = await firebase.auth().signInWithCredential(credential);
    return authResult;
  }

  static async registerWithEmailAndPassword(email: string, password: string) {
    return firebase?.auth().createUserWithEmailAndPassword(email, password);
  }

  static async signInWithEmailAndPassword(email: string, password: string) {
    return firebase?.auth().signInWithEmailAndPassword(email, password);
  }

  static async signOut() {
    return firebase.auth().signOut();
  }

  static isUserLogged() {
    return firebase.auth().currentUser as firebase.default.User;
  }
  static getUserId() {
    return firebase.auth().currentUser?.uid as string;
  }
}
