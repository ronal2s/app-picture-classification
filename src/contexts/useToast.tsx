import colors from "@utils/colors/colors";
import { showMessage } from "react-native-flash-message";

export default function showToast({
  message,
  color = colors.green[500],
  position = "bottom",
}: {
  color?: string;
  position?: "top" | "bottom" | "center";
  message: string;
}) {
  showMessage({
    message: "",
    titleStyle: { height: 0 },
    textStyle: { textAlign: "center", fontWeight: "bold" },
    description: message,
    style: { backgroundColor: color },
    position,
    floating: true,
  });
}
