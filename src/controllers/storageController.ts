import FirebaseController from "./firebaseController";

class StorageController {
  static async getBlob(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }
  static async uploadFile(
    uri: string,
    folder: string,
    filename?: string
  ): Promise<string> {
    const firebaseController = FirebaseController.app();
    const name = filename ? filename : new Date().getTime().toString();
    const storage = firebaseController.storage().ref(folder).child(name);
    const blob = await this.getBlob(uri);
    const file = await storage.put(blob);
    const fileUrl = await file.ref.getDownloadURL();
    return fileUrl;
  }

  static async deleteFile(uri: string): Promise<any> {
    const firebaseController = FirebaseController.app();
    const storage = firebaseController.storage().refFromURL(uri);
    return storage.delete();
  }
}

export default StorageController;
