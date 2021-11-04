import * as ImagePicker from "expo-image-picker";

import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import helpers from "@utils/helpers";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import SelectPictureModal from "@views/product_form/components/selectPictureModal";
import { StyledText } from "@components/styleds/styledText";
import { useNavigation, useRoute } from "@react-navigation/core";
import Screens from "@utils/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import ClassificationModal from "@views/camera/classificationModal";

function SelectPictureView({
  onChangeClassification,
}: {
  onChangeClassification: (classification: string) => void;
}) {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [pictureModal, setPictureModal] = useState(false);
  const [classificationModal, setClassificationModal] = useState(false);

  const { classification, picture: capturedPicture } = route.params as {
    classification: string;
    picture: string;
  };
  const [image, setImage] = useState(capturedPicture);

  useEffect(() => {
    setImage(capturedPicture);
  }, [capturedPicture]);

  useEffect(() => {
    onChangeClassification(classification);
  }, [classification]);

  const closePictureModal = () => {
    setPictureModal(false);
  };

  const openPictureModal = () => {
    setPictureModal(true);
  };

  const closeClassificationModal = () => {
    setClassificationModal(false);
  };

  const openClassificationModal = () => {
    setClassificationModal(true);
  };

  const onAcceptResults = (classification: string) => {
    onChangeClassification(classification);
    closeClassificationModal();
  };

  const onTakePicture = async () => {
    setPictureModal(false);
    navigation.navigate(Screens.CAMERA);
    // const result = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3],
    // });
    // if (!result.cancelled) {
    //   setImage((result as any).uri);
    // }
  };

  const onSelectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });
      if (!result.cancelled) {
        const pictureUri = result.uri;
        setPictureModal(false);
        setTimeout(() => {
          setImage(pictureUri);
          openClassificationModal();
        }, 1000);
      }
    }
    // setPictureModal(false);
  };

  return (
    <StyledView
      style={{
        backgroundColor: colors.grey[200],
        height: helpers.screen.height / 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {image != "" && (
        <TouchableOpacity
          style={{ flex: 1, width: "100%", height: "100%" }}
          onPress={openPictureModal}
        >
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      )}
      {!image && (
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={openPictureModal}
        >
          <Icon name="plus" size={100} color={colors.grey[600]} />
          <StyledText
            fontWeight="bold"
            color={colors.grey[600]}
            textAlign="center"
          >
            Imagen
          </StyledText>
        </TouchableOpacity>
      )}
      <SelectPictureModal
        isVisible={pictureModal}
        onClose={closePictureModal}
        onSelectPicture={onSelectPicture}
        onTakePicture={onTakePicture}
      />
      <ClassificationModal
        isVisible={classificationModal}
        onClose={closeClassificationModal}
        onAcceptResults={onAcceptResults}
        picture={image}
      />
    </StyledView>
  );
}

export default SelectPictureView;
