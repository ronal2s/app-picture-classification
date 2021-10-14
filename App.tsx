import {
  GlobalContextProvider,
  useGlobalContext,
} from "@contexts/globalContext";
import AuthController from "@controllers/authController";
import UserController from "@controllers/userController";
import { User } from "@models/user";
import colors from "@utils/colors/colors";
import NavigationContent from "@views/navigation/navigation";
import React, { useEffect } from "react";
import {
  DefaultTheme as DefaultThemePaper,
  Provider as PaperProvider,
} from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

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
            ...userFirestore,
          },
        });
      });
    } else {
      globalContext?.setContent({
        user: null,
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
