import constants from "@utils/constants";
import helpers from "@utils/helpers";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: constants.radius * 3,
    padding: constants.padding * 2,
    maxHeight: helpers.screen.height / 1.5,
  },
});
