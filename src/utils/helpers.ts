import { saveKeyValue } from "@services/secureStorage";
import { SecureStorageKey } from "@utils/secureKeys";
import { Dimensions, Platform } from "react-native";

export function capitalizeText(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

export function hexToRgba(hex: string, opacity?: number): string {
  const aux: string[] = hex.split("#")[1].match(/.{1,2}/g) as string[];
  const r = parseInt(aux[0], 16);
  const g = parseInt(aux[1], 16);
  const b = parseInt(aux[2], 16);
  const result = `${r},${g},${b}`;
  return `rgba(${result}, ${opacity ? opacity : 1})`;
}

export async function saveCurrency(fromCurrency: string, toCurrency: string) {
  var apiKey = "8cca08371218d5a4f4d1";

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + "_" + toCurrency;

  var url =
    "https://free.currconv.com/api/v7/convert?q=" +
    query +
    "&compact=ultra&apiKey=" +
    apiKey;

  let response: any = await fetch(url);
  response = await response.json();

  saveKeyValue(SecureStorageKey.currency, response.USD_DOP.toString());
}

export default {
  screen: Dimensions.get("screen"),
  isAndroid: Platform.OS == "android",
};
