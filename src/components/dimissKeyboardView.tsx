import helpers from "@utils/helpers";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StyledView } from "./styleds/styledView";

type DismissKeyboardViewProps = {
  children?: any;
  height?: number | string;
  scrollable?: boolean;
  style?: any;
};

function DimissKeyboardView(props: DismissKeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={!helpers.isAndroid ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={{ flex: 1, ...props.style }}
      {...props}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props.scrollable ? (
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            onEnded={Keyboard.dismiss}
          >
            <StyledView>{props.children}</StyledView>
          </ScrollView>
        ) : (
          <StyledView
            flex={1}
            // height={props.height}
          >
            {props.children}
          </StyledView>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default DimissKeyboardView;
