import { Dimensions, Platform } from "react-native";

export function capitalizeText(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

export default {
  screen: Dimensions.get("screen"),
  isAndroid: Platform.OS == "android",
};
