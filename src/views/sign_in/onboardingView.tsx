import { StyledView } from "@components/styleds/styledView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import { Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import Screens from "@utils/screens";
import { StyledText } from "@components/styleds/styledText";
import onboardingStyles from "./onboardingStyles";
import OnboardingSignIn from "@views/sign_in/onboardingSignIn";
import OnboardingVideoContent from "@views/sign_in/onboardingVideo";
// const logo = require("@assets/logo_white.png");

function OnboardingView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [signInVisible, setSignInVisible] = useState(false);

  const onGetStartedPressed = () => {
    // navigation.replace(ScreensCommons.LOCATION_PERMISSION);
  };

  const openJoinAsTrainer = () => {
    // navigation.navigate(ScreensTrainer.JOIN_STEP_1);
  };

  const toggleSignInView = () => {
    setSignInVisible(!signInVisible);
  };

  return (
    <SafeAreaView
      edges={["right", "left"]}
      style={{ backgroundColor: "black" }}
    >
      <OnboardingVideoContent />
      <OnboardingSignIn isVisible={signInVisible} />
    </SafeAreaView>
  );
}

export default OnboardingView;
