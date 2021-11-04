import { useNavigation } from "@react-navigation/core";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import colors from "@utils/colors/colors";
import HomeView from "@views/home/homeView";
import ProfileView from "@views/profile/profileView";
import ReportsView from "@views/reports/reportsView";
import React from "react";

const Tab = createMaterialBottomTabNavigator();

const barStyle = {
  // backgroundColor: colors.white,
  // backgroundColor: "#92ada8",
  backgroundColor: colors.primary,
};

function TabsContainer() {
  const navigation = useNavigation();
  return (
    // <Tab.Navigator activeColor={colors.primary} barStyle={barStyle}>
    <Tab.Navigator activeColor={colors.white} barStyle={barStyle}>
      <Tab.Screen
        name="Inicio"
        options={{ tabBarIcon: "home" }}
        component={HomeView}
      />
      <Tab.Screen
        name="Reportes"
        options={{ tabBarIcon: "file" }}
        component={ReportsView}
      />
      <Tab.Screen
        name="Perfil"
        options={{ tabBarIcon: "account" }}
        component={ProfileView}
      />
    </Tab.Navigator>
  );
}

export default TabsContainer;
