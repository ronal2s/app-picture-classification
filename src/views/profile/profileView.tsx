import MyCard from "@components/card/card";
import { StyledView } from "@components/styleds/styledView";
import AuthController from "@controllers/authController";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import helpers from "@utils/helpers";
import Screens from "@utils/screens";
import * as ImagePicker from "expo-image-picker";
import SelectPictureModal from "@views/product_form/components/selectPictureModal";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, List } from "react-native-paper";
import StorageController from "@controllers/storageController";
import { useGlobalContext } from "@contexts/globalContext";
import UserController from "@controllers/userController";
import CachedPicture from "@components/cachedPicture";
import { StyledText } from "@components/styleds/styledText";

const picture = require("@assets/placeholder.png");

function ProfileView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const globalContext = useGlobalContext();
  const user = globalContext?.content.user;
  const [profilePicture, setProfilePicture] = useState(
    user?.picture ? { uri: user?.picture } : picture
  );
  const [pictureModal, setPictureModal] = useState(false);
  const signOut = async () => {
    AuthController.signOut();
    navigation.replace(Screens.SIGN_IN);
  };

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

  const openScreen = (name: Screens) => {
    navigation.navigate(name);
  };

  const openPrivacyInfo = () => {
    navigation.navigate(Screens.DOCUMENT_VIEW, { document: "https://www.freeprivacypolicy.com/live/eeed969f-684c-44c7-872c-d19ee8e2431e" });
  }

  return (
    <StyledView flex={1} justifyContent="center" alignItems="center">
      <MyCard width={helpers.screen.width / 1.2} centered>
        <TouchableOpacity onPress={onRequestPicture}>
          {/* <Avatar.Image size={100} source={profilePicture} /> */}
          <CachedPicture
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={profilePicture}
          />
          {/* <StyledText textAlign="center" >{user?.fullname}</StyledText> */}
        </TouchableOpacity>
        <StyledView width="100%">
          <ProfileListItem
            title="Ver perfil"
            description="Información básica"
            onPress={() => openScreen(Screens.PROFILE_BASIC_INFO)}
          />
          <ProfileListItem
            title="Legal"
            description="Información legal"
            onPress={openPrivacyInfo}
          />
          <ProfileListItem
            title="Privacidad"
            description="Información de privacidad"
            onPress={openPrivacyInfo}
          />
        </StyledView>
        <Button mode="contained" onPress={signOut}>
          Cerrar sesión
        </Button>
      </MyCard>
      <SelectPictureModal
        isVisible={pictureModal}
        onClose={closePictureModal}
        onSelectPicture={onSelectPicture}
        onTakePicture={onTakePicture}
      />
    </StyledView>
  );
}

const ProfileListItem = ({
  title,
  description,
  onPress,
}: {
  title: string;
  description?: string;
  onPress?: () => void;
}) => {
  return (
    <List.Item
      title={title}
      description={description}
      onPress={onPress}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
    />
  );
};

export default ProfileView;
