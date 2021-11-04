import MyCard from "@components/card/card";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import AuthController from "@controllers/authController";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import helpers from "@utils/helpers";
import Screens from "@utils/screens";
import React from "react";
import { Avatar, Button, List } from "react-native-paper";

const picture =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

function ProfileView() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const signOut = async () => {
    AuthController.signOut();
    navigation.replace(Screens.SIGN_IN);
  };

  return (
    <StyledView flex={1} justifyContent="center" alignItems="center">
      <MyCard width={helpers.screen.width / 1.2} centered>
        <Avatar.Image size={100} source={{ uri: picture }} />
        <StyledView width="100%">
          <ProfileListItem
            title="Ver perfil"
            description="Información básica"
            onPress={() => alert("hola")}
          />
          <ProfileListItem
            title="Legal"
            description="Información legal"
            onPress={() => alert("hola")}
          />
          <ProfileListItem
            title="Privacidad"
            description="Información de privacidad"
            onPress={() => alert("hola")}
          />
        </StyledView>
        <Button mode="contained" onPress={signOut}>
          Cerrar sesión
        </Button>
      </MyCard>
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
