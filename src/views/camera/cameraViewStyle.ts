import colors from "@utils/colors/colors";
import helpers from "@utils/helpers";
import { StyleSheet } from "react-native";
const CIRCLE_SIZE = 80;

export default StyleSheet.create({
  bottomBar: {
    height: helpers.screen.height * 0.15,
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "row",
  },
  captureButton: {
    alignSelf: "center",
    // backgroundColor: "white",
    backgroundColor: colors.grey[300],
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    alignSelf: "center",
    position: "absolute",
    right: 10,
  },
});
