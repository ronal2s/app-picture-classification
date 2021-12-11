import { GlobalContextProvider } from "@contexts/globalContext";
import colors from "@utils/colors/colors";
import NavigationContent from "@views/navigation/navigation";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import {
  DefaultTheme as DefaultThemePaper,
  Provider as PaperProvider,
} from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import FlashMessage from "react-native-flash-message";
import { saveCurrency } from "@utils/helpers";

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
  useEffect(() => {
    saveCurrency("USD", "DOP");
  }, []);
  return (
    <PaperProvider theme={extendedTheme}>
      <GlobalContextProvider>
        <NavigationContent />
        <FlashMessage />
      </GlobalContextProvider>
    </PaperProvider>
  );
}
