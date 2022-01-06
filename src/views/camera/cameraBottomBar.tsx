import { StyledText } from "@components/styleds/styledText";
import { StyledView } from "@components/styleds/styledView";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import colors from "@utils/colors/colors";
import cameraViewStyle from "@views/camera/cameraViewStyle";
import React from "react";
import { TouchableOpacity } from "react-native";

function CameraBottomBar({
  capturePicture,
  flipCamera,
  deletePicture,
  picture,
}: {
  capturePicture: () => void;
  flipCamera: () => void;
  deletePicture: () => void;
  picture: string;
}) {
  if (picture) {
    return (
      <StyledView style={cameraViewStyle.bottomBar}>
        <TouchableOpacity
          onPress={deletePicture}
          style={{ ...cameraViewStyle.captureButton }}
        >
          <StyledText textAlign="center">Tomar</StyledText>
          <StyledText textAlign="center">otra</StyledText>
        </TouchableOpacity>
      </StyledView>
    );
  }
  return (
    <StyledView style={cameraViewStyle.bottomBar}>
      <TouchableOpacity
        onPress={capturePicture}
        style={cameraViewStyle.captureButton}
      >
        <Icon name="camera" size={42} color={colors.primary} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={flipCamera} style={cameraViewStyle.flipButton}>
        <Icon name="reload" size={42} color={colors.white} />
      </TouchableOpacity> */}
    </StyledView>
  );
}

export default CameraBottomBar;
