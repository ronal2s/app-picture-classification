import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
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
  onClose: () => void;
  picture: string;
  onAcceptResults: (classification: string) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [classification, setClassification] = useState("");

  const onModalWillShow = () => {
    setTimeout(() => {
      setLoading(false);
      setClassification("mesa");
    }, 2000);
  };

  const sendResults = () => {
    onAcceptResults(classification);
  };

  return (
    <Modal
      testID={"modal"}
      isVisible={isVisible}
      swipeDirection={["left", "right"]}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
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
          maxHeight: helpers.screen.height / 1.5,
        }}
      >
        <StyledTitle fontWeight="bold" fontSize={20} textAlign="center">
          Clasificando imagen
        </StyledTitle>
        {/* <StyledText color={colors.grey[700]} textAlign="center">
          Estamos procesando su imagen
        </StyledText> */}
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
            <Button onPress={sendResults} mode="contained">
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
            <Button onPress={sendResults}>Solo tomar imagen</Button>
            <Button color="red" onPress={onClose}>
              Cancelar
            </Button>
          </StyledView>
        )}
      </StyledView>
    </Modal>
  );
}

export default ClassificationModal;
