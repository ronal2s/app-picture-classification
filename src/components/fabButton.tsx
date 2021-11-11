import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const SIZE = 65;

function FabButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
      }}
      onPress={onPress}
    >
      <StyledView
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          backgroundColor: colors.primary,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 5,
          shadowOpacity: 0.4,
          elevation: 5,
          shadowColor: colors.grey[900],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="plus" color={"white"} size={30} />
      </StyledView>
    </TouchableOpacity>
  );
}

export default FabButton;
