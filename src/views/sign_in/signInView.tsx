import MyCard from "@components/card/card";
import DimissKeyboardView from "@components/dimissKeyboardView";
import MobileInput from "@components/mobile/mobile";
import ModalVerifyOTP from "@components/mobile/modalOTP";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import AuthController from "@controllers/authController";
import { saveKeyValue } from "@services/secureStorage";
import colors from "@utils/colors/colors";
import { firebaseConfig } from "@utils/config";
import constants from "@utils/constants";
import { SecureStorageKey } from "@utils/secureKeys";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

function SignInView() {
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
    <DimissKeyboardView>
      <StyledView padding={constants.padding} flex={1} justifyContent="center">
        <MyCard>
          <StyledTitle
            color={colors.primary}
            fontSize={42}
            fontWeight="200"
            textAlign="center"
          >
            Iniciar Sesión
          </StyledTitle>
          <StyledSpacer height={constants.margin * 2} />
          <MobileInput defaultValue={mobile} onChange={onChangeMobile} />
          <StyledSpacer />
          <Button mode="contained" onPress={sendOTPCode}>
            Iniciar sesión
          </Button>
          <StyledSpacer />
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
        attemptInvisibleVerification={true}
      />
    </DimissKeyboardView>
  );
}

export default SignInView;
