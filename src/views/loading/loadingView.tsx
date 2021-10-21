import { StyledView } from "@components/styleds/styledView";
import { useGlobalContext } from "@contexts/globalContext";
import AuthController from "@controllers/authController";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Screens from "@utils/screens";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

function LoadingView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const globalContext = useGlobalContext();

  useEffect(() => {
    if (!globalContext?.content.loadingApp) {
      const isUserLogged = AuthController.isUserLogged();
      const screen = isUserLogged ? Screens.HOME : Screens.SIGN_IN;
      navigation.replace(screen);
    }
  }, [globalContext?.content.loadingApp]);

  return (
    <StyledView flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size={40} />
    </StyledView>
  );
}

export default LoadingView;
