import * as SecureStore from "expo-secure-store";

export async function saveKeyValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getKeyValue(key: string) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  }
}

export async function removeKeyValue(key: string) {
  await SecureStore.deleteItemAsync(key);
}
