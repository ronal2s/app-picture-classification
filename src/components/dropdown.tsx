import colors from "@utils/colors/colors";
import React, { forwardRef, ReactNode, useEffect, useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Menu, TextInput, TouchableRipple, useTheme } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { Theme } from "react-native-paper/lib/typescript/types";

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
const windowHeight = Dimensions.get("screen").height;
export interface DropDownPropsInterface {
  // visible: boolean;
  // onDismiss: () => void;
  // showDropDown: () => void;
  value: string | number | undefined;
  name?: string;
  onChange: (value: string, name: string, index: number) => void;
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: "outlined" | "flat" | undefined;
  inputProps?: TextInputPropsWithoutTheme;
  list: Array<{
    label: string;
    value: string | number;
    custom?: ReactNode;
  }>;
  dropDownContainerMaxHeight?: number;
  activeColor?: string;
  theme?: Theme;
  dropDownStyle?: ViewStyle;
  dropDownItemStyle?: ViewStyle;
  hasSearch?: boolean;
}

type TextInputPropsWithoutTheme = Without<TextInputProps, "theme">;

const DropDown = forwardRef<TouchableWithoutFeedback, DropDownPropsInterface>(
  (props, ref) => {
    const activeTheme = useTheme();
    const {
      // visible,
      // onDismiss,
      // showDropDown,
      name,
      value,
      onChange,
      activeColor,
      mode,
      label,
      placeholder,
      inputProps,
      list = [],
      dropDownContainerMaxHeight,
      theme,
      dropDownStyle,
      dropDownItemStyle,
      hasSearch = false,
    } = props;
    const [show, setShow] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    });
    const [listArray, setListArray] = useState(list);

    const onLayout = (event: LayoutChangeEvent) => {
      setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
      const _label = list.find((_) => {
        if (typeof _.value === "string" && typeof value === "string") {
          return _.value.toLowerCase() === value.toLowerCase();
        } else {
          return _.value === value;
        }
      })?.label;
      if (_label) {
        setDisplayValue(_label);
      }
      setListArray(list);
    }, [list, value]);

    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme == "dark" ? "black" : "white";
    const underlineColor = colorScheme == "dark" ? "white" : colors.grey[500];

    return (
      <View onLayout={onLayout}>
        <Menu
          visible={show}
          onDismiss={() => setShow(false)}
          theme={theme}
          anchor={
            <TouchableRipple ref={ref} onPress={() => setShow(true)}>
              <View pointerEvents={"none"}>
                <TextInput
                  value={displayValue}
                  style={{
                    backgroundColor,
                  }}
                  underlineColor={underlineColor}
                  mode={mode}
                  label={label}
                  placeholder={placeholder}
                  pointerEvents={"none"}
                  theme={theme}
                  right={
                    <TextInput.Icon
                      name={"menu-down"}
                      color={colors.grey[500]}
                    />
                  }
                  {...inputProps}
                />
              </View>
            </TouchableRipple>
          }
          style={{
            maxWidth: inputLayout?.width,
            width: inputLayout?.width,
            ...dropDownStyle,
          }}
        >
          <ScrollView
            keyboardShouldPersistTaps={"always"}
            style={{ maxHeight: dropDownContainerMaxHeight || 200 }}
            nestedScrollEnabled={true}
          >
            {listArray.map((_item, _index) => (
              <Menu.Item
                key={_index}
                titleStyle={{
                  color:
                    value === _item.value
                      ? activeColor || (theme || activeTheme).colors.primary
                      : "black",
                  // : (theme || activeTheme).colors.text,
                }}
                onPress={() => {
                  onChange(_item.value as any, name, _index);
                  setShow(false);
                }}
                title={_item.custom || _item.label}
                style={{ maxWidth: inputLayout?.width, ...dropDownItemStyle }}
              />
            ))}
          </ScrollView>
        </Menu>
      </View>
    );
  }
);

export default DropDown;
