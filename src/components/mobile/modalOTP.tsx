import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import { useUser } from "@contexts/globalContext";
import AuthController from "@controllers/authController";
import FirebaseController from "@controllers/firebaseController";
import UserController from "@controllers/userController";
import { User } from "@models/user";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { getKeyValue } from "@services/secureStorage";
import colors from "@utils/colors/colors";
import Screens from "@utils/screens";
import { SecureStorageKey } from "@utils/secureKeys";
import React, { useState } from "react";
import { Alert } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import modalOTPStyle from "./modalOTPStyle";

function ModalVerifyOTP({
  isVisible,
  onSwipe,
  resendOTP,
}: {
  isVisible: boolean;
  onSwipe: () => void;
  resendOTP: () => void;
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const user = useUser();

  const onModalWillShow = async () => {
    setVerificationCode("");
  };

  const verifyCode = async () => {
    try {
      setIsLoading(true);
      const verificationId = (await getKeyValue(
        SecureStorageKey.verificationId
      )) as string;

      if (!verificationId) {
        Alert.alert("No se ha encontrado el id de verificación");
        return;
      }
      const response = await AuthController.confirmOTP(
        verificationId,
        verificationCode
      );
      if (response) {
        if (response.additionalUserInfo?.isNewUser) {
          const newUser = {
            ...user,
            createdAt: FirebaseController.getTimestamp(),
          } as User;
          await UserController.create(newUser);
        }

        onSwipe();
        navigation.replace(Screens.TABS_CONTAINER);
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <Modal
      testID={"modal"}
      isVisible={isVisible}
      onBackdropPress={onSwipe}
      onModalShow={onModalWillShow}
    >
      <StyledView style={modalOTPStyle.modalContent}>
        <StyledTitle fontSize={20} textAlign="center">
          Verificar código
        </StyledTitle>
        <StyledText color={colors.grey[700]} textAlign="center">
          Un código ha sido enviado a su teléfono
        </StyledText>
        <MyTextInput
          label="Código"
          value={verificationCode}
          keyboardType="numeric"
          maxLength={6}
          onChange={(value) => setVerificationCode(value)}
        />
        <StyledSpacer />
        <Button loading={isLoading} mode="contained" onPress={verifyCode}>
          Verificar
        </Button>
        <Button onPress={resendOTP}>Reenviar código</Button>
      </StyledView>
    </Modal>
  );
}

export default ModalVerifyOTP;
