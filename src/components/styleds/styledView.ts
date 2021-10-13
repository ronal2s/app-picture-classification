import { FlexAlignType } from "react-native";
import styled from "styled-components/native";
type ViewProps = {
  justifyContent?:
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "center"
    | "flex-end"
    | "flex-start";
  alignItems?: FlexAlignType;
  alignSelf?: FlexAlignType;
  padding?: number;
  margin?: number;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  backgroundColor?: string;
  borderRadius?: number;
  width?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  borderWidth?: number;
  borderColor?: string;
  borderBottomWidth?: number;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderTopLeftRadius?: number;
  borderBottomLeftRadius?: number;
  position?: "absolute" | "relative";
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  flex?: number;
  flexGrow?: number;
  marginHorizontal?: number | string;
  paddingLeft?: number | string;
  paddingBottom?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  minHeight?: number;
  zIndex?: number;
  opacity?: number;
  boxShadow?: string;
};

export const StyledView = styled.View((props: ViewProps) => ({
  justifyContent: props.justifyContent,
  margin: props.margin,
  boxShadow: props.boxShadow,
  alignItems: props.alignItems,
  alignSelf: props.alignSelf,
  minHeight: props.minHeight,
  padding: props.padding,
  paddingTop: props.paddingVertical ? props.paddingVertical : props.paddingTop,
  paddingBottom: props.paddingVertical
    ? props.paddingVertical
    : props.paddingBottom,
  paddingLeft: props.paddingHorizontal
    ? props.paddingHorizontal
    : props.paddingLeft,
  paddingRight: props.paddingHorizontal
    ? props.paddingHorizontal
    : props.paddingRight,
  marginTop: props.marginTop,
  marginBottom: props.marginBottom,
  marginLeft: props.marginHorizontal
    ? props.marginHorizontal
    : props.marginLeft,
  marginRight: props.marginHorizontal
    ? props.marginHorizontal
    : props.marginRight,
  backgroundColor: props.backgroundColor as any,
  borderRadius: props.borderRadius,
  height: props.height,
  flexDirection: props.flexDirection,
  flexWrap: props.flexWrap as any,
  borderColor: props.borderColor as any,
  borderWidth: props.borderWidth,
  width: props.width,
  maxWidth: props.maxWidth,
  borderTopLeftRadius: props.borderTopLeftRadius,
  borderBottomLeftRadius: props.borderBottomLeftRadius,
  borderBottomWidth: props.borderBottomWidth,
  borderTopRightRadius: props.borderTopRightRadius,
  borderBottomRightRadius: props.borderBottomRightRadius,
  position: props.position as any,
  left: props.left,
  right: props.right,
  top: props.top,
  bottom: props.bottom,
  flex: props.flex,
  flexGrow: props.flex,
  opacity: props.opacity,
  zIndex: props.zIndex,
}));
