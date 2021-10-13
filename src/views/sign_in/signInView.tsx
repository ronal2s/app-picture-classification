import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import AuthController from "@controllers/authController";
import { useNavigation } from "@react-navigation/core";
import { saveKeyValue } from "@services/secureStorage";
import constants from "@utils/constants";
import { SecureStorageKey } from "@utils/secureKeys";
import React, { useRef } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native-paper";

function SignInView() {
  const navigation = useNavigation();
  const [mobile, setMobile] = React.useState({
    areaCode: "+1",
    number: "8293733603",
  });
  const refInputNumber = useRef<TextInput>();

  const onChangeMobile = (value: string, name: string) => {
    setMobile({ ...mobile, [name]: value });
  };

  const onPressSignIn = async () => {
    const response = await AuthController.verifiedPhoneNumber({
      phoneNumber: mobile.areaCode + mobile.number,
    });
    saveKeyValue(SecureStorageKey.verificationId, response);

    refInputNumber.current?.focus();
    // navigation.navigate(ScreensCommons.AUTH_OTP, {
    //   comeFrom,
    //   areaCode,
    //   phoneNumber,
    //   onValidatePhone,
    // });
  };

  return (
    <StyledView padding={constants.padding} flex={1}>
      <StyledView
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <MyTextInput
          name="areaCode"
          value={mobile.areaCode}
          onChange={onChangeMobile}
          returnKeyType="next"
          onSubmitEditing={() => {
            refInputNumber.current?.focus();
          }}
        />
        <StyledView flex={2}>
          <MyTextInput
            name="number"
            value={mobile.number}
            setRef={(ref) => (refInputNumber.current = ref)}
            onChange={onChangeMobile}
          />
        </StyledView>
      </StyledView>
      <Button onPress={onPressSignIn}>Sign In</Button>
    </StyledView>
  );
}

export default SignInView;
