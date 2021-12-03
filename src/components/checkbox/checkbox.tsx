import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";

const size = 10;

function Checkbox(props: {
  active: boolean;
  title?: string;
  type?: "square" | "circle" | "circle-flat";
  fontStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity disabled={!props.onPress} onPress={props.onPress}>
      <StyledView flexDirection="row" alignItems="center" paddingVertical={3}>
        {props.type == "square" ? (
          <StyledView
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: colors.primary,
              backgroundColor: props.active ? colors.primary : colors.white,
            }}
          />
        ) : props.type == "circle-flat" ? (
          <StyledView
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.primary,
              backgroundColor: props.active ? colors.primary : colors.white,
            }}
          />
        ) : (
          <StyledView
            backgroundColor={props.active ? colors.primary : "grey"}
            width={size * 2}
            height={size * 2}
            borderRadius={(size * 2) / 2}
            justifyContent="center"
            alignItems="center"
          >
            <StyledView
              backgroundColor="white"
              width={size}
              height={size}
              borderRadius={size / 2}
            />
          </StyledView>
        )}
        {props.title && <StyledSpacer width={2} />}
        {props.active && props.title && (
          <StyledText style={props.fontStyle}>{props.title}</StyledText>
        )}
        {!props.active && props.title && (
          <StyledText color="grey" style={props.fontStyle}>
            {props.title}
          </StyledText>
        )}
      </StyledView>
    </TouchableOpacity>
  );
}

export default Checkbox;
