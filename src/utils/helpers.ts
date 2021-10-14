import { Dimensions, Platform } from "react-native";

export default {
  screen: Dimensions.get("screen"),
  isAndroid: Platform.OS == "android",
};
