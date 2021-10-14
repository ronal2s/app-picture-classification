import "firebase/auth";
import { Alert } from "react-native";
import FirebaseController from "./firebaseController";
const firebase = FirebaseController.app();

export default class AuthController {
  static auth(): firebase.default.auth.Auth {
    return firebase?.auth();
  }

  static async sendOTPCode({
    phoneNumber,
    recaptchaVerifier,
  }: {
    phoneNumber: string;
    recaptchaVerifier: any;
  }) {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const response = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      return response;
    } catch (error) {
      Alert.alert(error.message);
      return null;
    }
  }

  static async confirmOTP(verificationId: string, verificationCode: string) {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const authResult = await firebase.auth().signInWithCredential(credential);
      return authResult;
    } catch (error) {
      Alert.alert(error.message);
      return null;
    }
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
