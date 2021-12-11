import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5,
    shadowColor: colors.grey[400],
    padding: constants.padding,
    backgroundColor: "white",
    // backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: constants.radius,
  },
});
