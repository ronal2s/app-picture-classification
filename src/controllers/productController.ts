import AuthController from "@controllers/authController";
import FirebaseController from "@controllers/firebaseController";
import Product from "@models/product";
import { collections } from "@utils/collections";

class ProductController {
  static async add({ product }: { product: Product }) {
    const firebaseController = FirebaseController.app();
    const ref = await firebaseController
      .firestore()
      .collection(collections.products)
      .add({
        ...product,
        userId: AuthController.auth().currentUser?.uid,
        createdAt: FirebaseController.getTimestamp(),
      });
    return ref.update({ id: ref.id });
  }

  static async update({ product }: { product: Product }) {
    const firebaseController = FirebaseController.app();
    const ref = await firebaseController
      .firestore()
      .collection(collections.products)
      .doc(product.id)
      .update({
        ...product,
        updatedAt: FirebaseController.getTimestamp(),
      });
    return ref;
  }

  static async get() {
    const firebaseController = FirebaseController.app();
    const userId = AuthController.auth().currentUser?.uid;
    console.log(userId);
    const ref = await firebaseController
      .firestore()
      .collection(collections.products)
      .where("userId", "==", userId)
      .get();

    return ref.docs.map((doc) => doc.data());
  }
}

export default ProductController;
