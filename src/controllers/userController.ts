import AuthController from "@controllers/authController";
import FirebaseController from "@controllers/firebaseController";
import StorageController from "@controllers/storageController";
import { User } from "@models/user";
import { collections } from "@utils/collections";

export default class UserController {
  static async getUsers(): Promise<User[]> {
    const firebaseController = FirebaseController.app();
    const snapshot = await firebaseController
      .firestore()
      .collection(collections.users)
      .get();
    return snapshot.docs.map((doc) => doc.data()) as User[];
  }

  static async create(user: User) {
    const firebaseController = FirebaseController.app();
    const userId = AuthController.auth().currentUser?.uid;
    const ref = await firebaseController
      .firestore()
      .collection(collections.users)
      .doc(userId)
      .set({ ...user, id: userId });
    return ref;
    // return ref.update({ id: ref.id });
  }

  static async update(user: User): Promise<void> {
    const firebaseController = FirebaseController.app();
    try {
      return firebaseController
        .firestore()
        .collection(collections.users)
        .doc(user.id)
        .update(user);
    } catch (error) {
      console.log("updateUser error", error?.message);
    }
  }

  static async getUserById(id: string): Promise<{ data: () => User }> {
    let firebaseController = FirebaseController.app();
    return firebaseController
      ?.firestore()
      .collection(collections.users)
      .doc(id)
      .get() as any;
  }

  static getDoc(id: string) {
    let firebaseController = FirebaseController.app();
    return firebaseController
      ?.firestore()
      .collection(collections.users)
      .doc(id);
  }

  static async updateProfilePicture(
    // user: User,
    pictureUri: string,
    oldPictureUri?: string
  ) {
    const userId = AuthController.auth().currentUser?.uid as string;
    let downloadedPicture = await StorageController.uploadFile(
      pictureUri,
      userId
    );
    // user.picture = downloadedPicture;
    FirebaseController.app()
      .firestore()
      .collection(collections.users)
      .doc(userId)
      .update({
        picture: downloadedPicture,
      });
    if (oldPictureUri) {
      StorageController.deleteFile(oldPictureUri);
    }
  }
}
