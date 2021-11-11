import FirebaseController from "@controllers/firebaseController";
import Product from "@models/product";

class ProductController {
  static async add({ product }: { product: Product }) {
    const firebaseController = FirebaseController.app();
    const ref = await firebaseController
      .firestore()
      .collection("products")
      .add(product);
    return ref.update({ id: ref.id });
  }
}

export default ProductController;
