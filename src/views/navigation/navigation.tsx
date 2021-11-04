import { useGlobalContext } from "@contexts/globalContext";
import AuthController from "@controllers/authController";
import UserController from "@controllers/userController";
import { User } from "@models/user";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "@utils/colors/colors";
import Screens from "@utils/screens";
import views from "@views/navigation/screens";
import React, { useEffect } from "react";
const Stack = createStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "white" },
};

function NavigationContent() {
  const ALL_SCREENS = [...views];
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
          loadingApp: false,
          user: {
            ...globalContext.content.user,
            ...userFirestore,
          },
        });
      });
    } else {
      globalContext?.setContent({
        user: null,
        loadingApp: false,
      });
    }
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={Screens.LOADING}
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      >
        {ALL_SCREENS.map((view, key) => {
          return (
            <Stack.Screen
              name={view.name}
              component={view.component}
              options={view.options}
              key={key}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationContent;
