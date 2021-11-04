import { StyledText } from "@components/styleds/styledText";
import { StyledView } from "@components/styleds/styledView";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "@utils/colors/colors";
import Screens from "@utils/screens";
import CameraBottomBar from "@views/camera/cameraBottomBar";
import ClassificationModal from "@views/camera/classificationModal";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity } from "react-native";

function CameraView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState("");

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();
  //     console.log("picture: ", picture);
  //     navigation.navigate(Screens.PRODUCT_FORM, {
  //       classification: "",
  //       picture,
  //     });
  //   });
  // }, [navigation, picture]);

  useEffect(() => {
    // navigation.setOptions({
    //   headerLeft: () => (
    //     <TouchableOpacity style={{ marginLeft: 10 }}>
    //       <StyledText color="white">Atrás</StyledText>
    //     </TouchableOpacity>
    //   ),
    // });

    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status == "granted");
  };
  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status == "granted");
  };

  const deletePicture = () => {
    setPicture("");
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setPicture("");
  };

  const capturePicture = async () => {
    if (hasPermission) {
      const photo = await (cameraRef.current as any).takePictureAsync({
        quaity: 0.1,
        base64: true,
      });

      console.log(Object.keys(photo));
      setPicture(photo.uri);
      openModal();
    } else {
      requestPermission();
    }
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onAcceptResults = (classification: string) => {
    navigation.navigate(Screens.PRODUCT_FORM, {
      classification,
      picture,
    });
  };

  if (hasPermission === false) {
    return (
      <StyledView flex={1} justifyContent="center" alignItems="center">
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            alignItems: "center",
            width: "50%",
          }}
        >
          <Icon name="camera" size={32} color={colors.primary} />
          <StyledText
            fontSize={20}
            fontWeight="bold"
            color={colors.primary}
            textAlign="center"
          >
            Conceder permiso a la cámara
          </StyledText>
        </TouchableOpacity>
      </StyledView>
    );
  }

  return (
    <StyledView flex={1}>
      {picture == "" && (
        <Camera ref={cameraRef} style={{ flex: 1 }} type={type} />
      )}
      {picture != "" && <Image source={{ uri: picture }} style={{ flex: 1 }} />}
      <CameraBottomBar
        capturePicture={capturePicture}
        flipCamera={flipCamera}
        picture={picture}
        deletePicture={deletePicture}
      />
      <ClassificationModal
        isVisible={modal}
        onClose={closeModal}
        onAcceptResults={onAcceptResults}
        picture={picture}
      />
    </StyledView>
  );
}

export default CameraView;
