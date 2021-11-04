import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import React from "react";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";

function SelectPictureModal({
  isVisible,
  onClose,
  onSelectPicture,
  onTakePicture,
}: {
  isVisible: boolean;
  onClose: () => void;
  onSelectPicture: () => void;
  onTakePicture: () => void;
}) {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={["down", "left", "right"]}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      // backdropColor="red"
      backdropOpacity={0.8}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        margin: 0,
        padding: 0,
      }}
    >
      <StyledView
        style={{
          // backgroundColor: "white",
          backgroundColor: "#0e997d",
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Button color={colors.white} onPress={onTakePicture}>
          Capturar desde la cámara
        </Button>
        <Button color={colors.grey[800]} onPress={onSelectPicture}>
          Abrir galería
        </Button>
      </StyledView>
    </Modal>
  );
}

export default SelectPictureModal;
