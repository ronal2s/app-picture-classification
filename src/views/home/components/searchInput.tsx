import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import React from "react";
import { TextInput } from "react-native";

function SearchInput({ onChange }: { onChange: (text: string) => void }) {
  return (
    <StyledView width="100%" paddingHorizontal={30}>
      <TextInput
        placeholder="Búsqueda"
        placeholderTextColor={colors.grey[800]}
        style={{
          // backgroundColor: colors.primary,
          backgroundColor: colors.grey[200],
          // backgroundColor: hexToRgba(colors.primary, 0.5),
          width: "100%",
          height: 50,
          borderRadius: 25,
          padding: 10,
          color: colors.grey[800],
          fontWeight: "bold",
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 5,
          shadowOpacity: 1,
          elevation: 5,
          shadowColor: colors.grey[400],
          zIndex: 0,
        }}
        onChangeText={(text) => onChange(text)}
      />
    </StyledView>
  );
}

export default SearchInput;
