import CachedPicture from "@components/cachedPicture";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import { useGlobalContext } from "@contexts/globalContext";
import ClassificationController from "@controllers/classificationController";
import StorageController from "@controllers/storageController";
import { User } from "@models/user";
import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import helpers from "@utils/helpers";
import React from "react";
import { useState } from "react";
import Modal from "react-native-modal";
import { ActivityIndicator, Button } from "react-native-paper";

function ClassificationModal({
  isVisible,
  onClose,
  onAcceptResults,
  picture,
}: {
  isVisible: boolean;
  onClose: (storagedPicture: string, dontAddPicture?: boolean) => void;
  picture: string;
  onAcceptResults: (classification: string, storagedPicture: string) => void;
}) {
  const globalContext = useGlobalContext();
  const user = globalContext?.content.user as User;
  const [loading, setLoading] = useState(true);
  const [classification, setClassification] = useState("");
  const [storagedPicture, setStoragedPicture] = useState("");

  const onModalWillShow = async () => {
    const pictureStorageURL = await StorageController.uploadFile(
      picture,
      user.id
    );
    setStoragedPicture(pictureStorageURL);
    const response = await ClassificationController.request(pictureStorageURL);
    if (globalContext) {
      globalContext?.setContent({
        ...globalContext.content,
        currentClassification: response.prediction,
      });
    }
    setLoading(false);
    setClassification(response.prediction);
  };

  const sendResults = (sendClassification?: boolean) => {
    setLoading(true);
    setClassification("");
    onAcceptResults(sendClassification ? classification : "", storagedPicture);
  };

  return (
    <Modal
      testID={"modal"}
      isVisible={isVisible}
      swipeDirection={["left", "right"]}
      onSwipeComplete={() => onClose(storagedPicture)}
      onBackdropPress={() => onClose(storagedPicture)}
      onModalShow={onModalWillShow}
      style={{
        padding: 10,
      }}
    >
      <StyledView
        style={{
          backgroundColor: "white",
          borderRadius: constants.radius * 2,
          padding: constants.padding * 2,
          // maxHeight: helpers.screen.height / 1.5,
        }}
      >
        <StyledTitle fontWeight="bold" fontSize={20} textAlign="center">
          Clasificando imagen
        </StyledTitle>
        {/* <StyledText color={colors.grey[700]} textAlign="center">
          Estamos procesando su imagen
        </StyledText> */}
        <StyledSpacer />
        <CachedPicture
          source={{ uri: picture }}
          style={{
            borderRadius: 10,
            // width: 300,
            width: "100%",
            // flex: 1,
            height: 150,
            alignSelf: "center",
          }}
        />
        <StyledSpacer />
        {loading && <ActivityIndicator />}
        {classification != "" && (
          <StyledView>
            <StyledText
              fontSize={18}
              color={colors.grey[700]}
              textAlign="center"
            >
              Se ha clasificado como{" "}
              <StyledText
                fontWeight="bold"
                color={colors.primary}
                textAlign="center"
              >
                {classification}
              </StyledText>
            </StyledText>
            <StyledSpacer />
            <Button
              color={colors.secondary}
              onPress={() => sendResults(true)}
              mode="contained"
            >
              Aceptar clasificación
            </Button>
            <StyledSpacer height={2} />
            {/* <Button
              color={colors.grey[200]}
              onPress={sendResults}
              mode="contained"
            >
              Aceptar clasificación
            </Button> */}
            <Button onPress={() => sendResults(false)}>
              Solo tomar imagen
            </Button>
            <Button
              color="red"
              onPress={() => {
                setLoading(true);
                setClassification("");
                onClose(storagedPicture, true);
              }}
            >
              Cancelar
            </Button>
          </StyledView>
        )}
      </StyledView>
    </Modal>
  );
}

export default ClassificationModal;
