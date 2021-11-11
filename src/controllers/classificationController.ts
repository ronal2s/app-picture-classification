import constants from "@utils/constants";

class ClassificationController {
  static async request(pictureUrl: string): Promise<{ prediction: string }> {
    // POST to "http://test.com" with body url
    const response = await fetch(`${constants.URL_API}/predict`, {
      method: "POST",
      body: JSON.stringify({ url: pictureUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}

export default ClassificationController;
