import {
  GlobalContextProvider,
  useGlobalContext,
} from "@contexts/globalContext";
import {
  Provider as PaperProvider,
  DefaultTheme as DefaultThemePaper,
} from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import AuthController from "@controllers/authController";
import UserController from "@controllers/userController";
import { User } from "@models/user";
import NavigationContent from "@views/navigation/navigation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "@utils/colors/colors";

const extendedTheme: Theme = {
  ...DefaultThemePaper,
  colors: {
    ...DefaultThemePaper.colors,
    primary: colors.primary,
    disabled: "red",
    // placeholder: colorScheme == "dark" ? "white" : colors.swatches.darkGrey,
    // text: colorScheme == "dark" ? "white" : "black",
  },
};

export default function App() {
  const globalContext = useGlobalContext();

  useEffect(() => {
    const subscriber =
      AuthController.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on un-mount
  }, []);

  const onAuthStateChanged = async (user: firebase.default.User | null) => {
    if (user) {
      UserController.getDoc(user.uid).onSnapshot((observer) => {
        const userFirestore: User = observer.data() as User;
        if (userFirestore) console.log("userId", userFirestore.id);
        globalContext?.setContent({
          user: {
            ...globalContext.content.user,
            data: userFirestore,
          },
        });
      });
    } else {
      globalContext?.setContent({
        user: { data: null },
      });
    }
  };

  return (
    <PaperProvider theme={extendedTheme}>
      <GlobalContextProvider>
        <NavigationContent />
      </GlobalContextProvider>
    </PaperProvider>
  );
}
