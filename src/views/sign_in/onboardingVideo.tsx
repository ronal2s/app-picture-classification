import React from "react";
import { Video } from "expo-av";
import { Image } from "react-native";
import { StyledView } from "@components/styleds/styledView";

// const logo = require("@assets/logo_white.png");

function OnboardingVideoContent() {
  return (
    <StyledView>
      <Video
        style={{
          width: "100%",
          height: "100%",
        }}
        source={require("@assets/sample.mp4")}
        useNativeControls={false}
        resizeMode={"cover"}
        shouldPlay={true}
        volume={0.1}
        isMuted
        isLooping
      />

      <StyledView
        position="absolute"
        height={"100%"}
        width={"100%"}
        backgroundColor="rgba(0,0,0,0.5)"
      >
        {/* <Image
          source={logo}
          style={{
            height: 80,
            top: 50,
            alignSelf: "center",
          }}
          resizeMode="contain"
        /> */}
      </StyledView>
    </StyledView>
  );
}

export default OnboardingVideoContent;
