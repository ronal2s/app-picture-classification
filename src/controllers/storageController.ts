import FirebaseController from "./firebaseController";

class StorageController {
  static async getBlob(uri: string) {
    // const response = await fetch("file:/" + uri);
    // const response = await fetch("file:/" + uri);
    // const blob = await response.blob();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed")); // error occurred, rejecting
      };
      xhr.responseType = "blob"; // use BlobModule's UriHandler
      xhr.open("GET", uri, true); // fetch the blob from uri in async mode
      xhr.send(null); // no initial data
    });
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
