import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import AuthController from "@controllers/authController";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Screens from "@utils/screens";
import React from "react";
import { Button } from "react-native-paper";

function HomeView() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const signOut = async () => {
    AuthController.signOut();
    navigation.replace(Screens.SIGN_IN);
  };

  return (
    <StyledView flex={1} justifyContent="center" alignItems="center">
      <StyledTitle>Home</StyledTitle>
      <StyledSpacer />
      <Button onPress={signOut}>Cerrar sesión</Button>
    </StyledView>
  );
}

export default HomeView;
