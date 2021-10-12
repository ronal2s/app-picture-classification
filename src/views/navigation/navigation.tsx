import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from "@utils/screens";
import views from "@views/navigation/screens";
import React from "react";
const Stack = createStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "white" },
};

function NavigationContent() {
  const ALL_SCREENS = [...views];

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName={Screens.SIGN_IN}>
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
