import { GlobalContextProvider } from "@contexts/globalContext";
import colors from "@utils/colors/colors";
import NavigationContent from "@views/navigation/navigation";
import React from "react";
import { LogBox } from "react-native";
import {
  DefaultTheme as DefaultThemePaper,
  Provider as PaperProvider,
} from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

LogBox.ignoreAllLogs();

const extendedTheme: Theme = {
  ...DefaultThemePaper,
  colors: {
    ...DefaultThemePaper.colors,
    primary: colors.primary,
    // disabled: "red",
    // placeholder: colorScheme == "dark" ? "white" : colors.swatches.darkGrey,
    // text: colorScheme == "dark" ? "white" : "black",
  },
};

export default function App() {
  return (
    <PaperProvider theme={extendedTheme}>
      <GlobalContextProvider>
        <NavigationContent />
      </GlobalContextProvider>
    </PaperProvider>
  );
}
