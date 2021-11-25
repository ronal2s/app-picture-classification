import { StyledView } from "@components/styleds/styledView";
import AuthController from "@controllers/authController";
import SelectPictureModal from "@views/product_form/components/selectPictureModal";
import { TouchableOpacity } from "react-native";
import UserController from "@controllers/userController";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "@contexts/globalContext";
import React, { useState } from "react";
import { Avatar, Button } from "react-native-paper";
import constants from "@utils/constants";
import MyTextInput from "@components/textInput/textInput";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import colors from "@utils/colors/colors";
import { User } from "@models/user";

const picture = require("@assets/placeholder.png");

function ProfileBasicInfoView() {
  const globalContext = useGlobalContext();
  const user = globalContext?.content.user;
  const [profilePicture, setProfilePicture] = useState(
    { uri: user?.picture } ?? picture
  );
  const [form, setForm] = useState({
    id: user?.id,
    fullname: user?.fullname ?? "",
    address: user?.address ?? "",
    email: user?.email ?? "",
    picture: profilePicture.uri,
  });
  const [pictureModal, setPictureModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const closePictureModal = () => {
    setPictureModal(false);
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
        setProfilePicture({ uri: pictureUri });
        UserController.updateProfilePicture(pictureUri);
      }
    }
  };

  const onTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work");
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });
      if (!result.cancelled) {
        const pictureUri = result.uri;
        setPictureModal(false);
        setProfilePicture({ uri: pictureUri });
        UserController.updateProfilePicture(pictureUri);
      }
    }
  };

  const onRequestPicture = () => {
    setPictureModal(true);
  };

  const handleInputs = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };

  const onSave = async () => {
    setLoading(true);
    UserController.update(form as User);
    setLoading(false);
  };

  return (
    <StyledView padding={constants.padding}>
      <StyledView alignItems="center">
        <TouchableOpacity
          onPress={onRequestPicture}
          style={{
            borderColor: colors.primary,
            borderWidth: 2,
            borderRadius: 100,
          }}
        >
          <Avatar.Image size={200} source={profilePicture} />
        </TouchableOpacity>
      </StyledView>
      <MyTextInput
        label="Nombre"
        name="fullname"
        value={form.fullname}
        onChange={handleInputs}
      />
      <MyTextInput
        label="Dirección"
        name="address"
        value={form.address}
        onChange={handleInputs}
      />
      <MyTextInput
        label="Correo electrónico"
        name="email"
        value={form.email}
        onChange={handleInputs}
      />
      <StyledSpacer />
      <Button loading={loading} mode="contained" onPress={onSave}>
        Guardar{" "}
      </Button>
      <SelectPictureModal
        isVisible={pictureModal}
        onClose={closePictureModal}
        onSelectPicture={onSelectPicture}
        onTakePicture={onTakePicture}
      />
    </StyledView>
  );
}

export default ProfileBasicInfoView;
