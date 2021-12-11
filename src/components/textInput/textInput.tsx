import { StyledText } from "@components/styleds/styledText";
import IMyTextInput from "@components/textInput/ItextInput";
import colors from "@utils/colors/colors";
import React from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { TextInput } from "react-native-paper";

function MyTextInput({
  label,
  mode,
  placeholder,
  height,
  onChange,
  borderColor = "grey",
  borderWidth = 0,
  value,
  name,
  secureTextEntry = false,
  disabled = false,
  placeholderTextColor,
  keyboardType,
  multiline,
  maxLength,
  autoFocus,
  error = "",
  returnKeyType = "done",
  setRef,
  onSubmitEditing,
  backgroundColor = colors.white,
}: IMyTextInput) {
  return (
    <React.Fragment>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        label={label}
        value={value}
        ref={(ref) => (setRef ? setRef(ref) : null)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        disabled={disabled}
        mode={mode}
        autoFocus={autoFocus}
        style={{
          minHeight: height,
          borderColor,
          borderWidth,
          backgroundColor,
          // backgroundColor:
          //   mode == "outlined"
          //     ? colorScheme == "dark"
          //       ? "black"
          //       : "white"
          //     : backgroundColor,
        }}
        multiline={multiline}
        // underlineColor={
        //   colorScheme == "dark" ? "white" : colors.swatches.lightGrey
        // }
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onChange={(value: NativeSyntheticEvent<TextInputChangeEventData>) =>
          onChange(value.nativeEvent.text, name as string)
        }
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />
      {error != "" && <StyledText color={colors.red[500]}>{error}</StyledText>}
    </React.Fragment>
  );
}

export default MyTextInput;
