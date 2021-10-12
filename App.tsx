import {
  GlobalContextProvider,
  useGlobalContext,
} from "@contexts/globalContext";
import AuthController from "@controllers/authController";
import UserController from "@controllers/userController";
import { User } from "@models/user";
import NavigationContent from "@views/navigation/navigation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    <GlobalContextProvider>
      <NavigationContent />
    </GlobalContextProvider>
  );
}
