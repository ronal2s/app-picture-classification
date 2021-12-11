import MyCard from "@components/card/card";
import DimissKeyboardView from "@components/dimissKeyboardView";
import MobileInput from "@components/mobile/mobile";
import ModalVerifyOTP from "@components/mobile/modalOTP";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import AuthController from "@controllers/authController";
import { saveKeyValue } from "@services/secureStorage";
import colors from "@utils/colors/colors";
import { firebaseConfig } from "@utils/config";
import constants from "@utils/constants";
import helpers, { hexToRgba } from "@utils/helpers";
import { SecureStorageKey } from "@utils/secureKeys";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

function OnboardingSignIn({ isVisible }: { isVisible?: boolean }) {
  const refCaptchaVerifier = useRef(null);
  const [modal, setModal] = useState(false);

  const [mobile, setMobile] = React.useState({
    areaCode: "+1",
    number: "8293733603",
  });
  const fullPhoneNumber = mobile.areaCode + mobile.number;

  const onChangeMobile = (mobile: { areaCode: string; number: string }) => {
    setMobile(mobile);
  };

  const sendOTPCode = async () => {
    if (!mobile.number || !mobile.areaCode) {
      Alert.alert("El teléfono es obligatorio");
      return;
    }

    try {
      const response = await AuthController.sendOTPCode({
        phoneNumber: fullPhoneNumber,
        recaptchaVerifier: refCaptchaVerifier,
      });

      if (response) {
        saveKeyValue(SecureStorageKey.verificationId, response);
        setModal(true);
        // Alert.alert(`Un código ha sido enviado a ${fullPhoneNumber}`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ha ocurrido un error enviando el código de verificación");
    }
  };

  return (
    <StyledView
      position="absolute"
      justifyContent="center"
      alignItems="center"
      height={"100%"}
      width={"100%"}
    >
      <StyledView
      // padding={constants.padding}
      // // flex={1}
      // height={helpers.screen.height}
      // justifyContent="center"
      // backgroundColor={colors.primary}
      >
        <MyCard
          backgroundColor="rgba(255,255,255,0.5)"
          shadowColor="#0c6e5b"
          width={helpers.screen.width / 1.2}
          // height={helpers.screen.height / 4}
        >
          {/* <StyledSpacer height={constants.margin * 2} /> */}
          <StyledText
            fontSize={20}
            textAlign="center"
            fontWeight="200"
            color={hexToRgba("#000000", 0.6)}
          >
            Iniciar sesión{" "}
          </StyledText>
          <StyledSpacer />
          <MobileInput defaultValue={mobile} onChange={onChangeMobile} />
          <StyledSpacer />
          {/* <Button mode="contained" onPress={sendOTPCode}> */}
          <Button
            // mode="contained"
            mode="contained"
            onPress={sendOTPCode}
            color={hexToRgba(colors.primary, 0.8)}
          >
            Iniciar sesión
          </Button>
          {/* <StyledSpacer /> */}
        </MyCard>
      </StyledView>
      <ModalVerifyOTP
        isVisible={modal}
        onSwipe={() => setModal(false)}
        resendOTP={sendOTPCode}
      />
      <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={refCaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification={true}
      />
    </StyledView>
  );
}

export default OnboardingSignIn;
