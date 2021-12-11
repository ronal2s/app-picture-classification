import { StyledText } from "@components/styleds/styledText";
import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import React from "react";
import { TextInput } from "react-native";
import { IconButton } from "react-native-paper";

function SearchInput({
  onChange,
  onClear,
  value,
  orderBy = "asc",
  onChangeOrderBy,
}: {
  value?: string;
  orderBy?: string;
  onChange: (text: string) => void;
  onClear: () => void;
  onChangeOrderBy?: (order: string) => void;
}) {
  return (
    <StyledView width="100%" paddingHorizontal={30}>
      {/* <StyledView zIndex={0} marginRight={40}> */}
      <StyledView zIndex={0}>
        <TextInput
          placeholder="Búsqueda"
          placeholderTextColor={colors.grey[800]}
          defaultValue={value}
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
          }}
          onChangeText={(text) => onChange(text)}
        />
      </StyledView>
      {value != "" && (
        <StyledView position="absolute" right={30} zIndex={2}>
          <IconButton icon="close" color={colors.grey[800]} onPress={onClear} />
        </StyledView>
      )}
      {value == "" && (
        <StyledView position="absolute" right={30} zIndex={2}>
          <IconButton icon="magnify" color={colors.grey[800]} />
        </StyledView>
      )}
      {/* <StyledView position="absolute" right={20} zIndex={2}>
        <IconButton
          onPress={() => {
            onChangeOrderBy(orderBy == "asc" ? "desc" : "asc");
          }}
          icon={orderBy == "desc" ? "arrow-up" : "arrow-down"}
          color={colors.grey[800]}
        />
        <StyledText textAlign="center" style={{ top: -20 }}>
          {orderBy}
        </StyledText>
      </StyledView> */}
    </StyledView>
  );
}

export default SearchInput;
