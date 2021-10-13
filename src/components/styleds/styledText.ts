import styled from "styled-components/native";

export type TextProps = {
  color?: string | any;
  backgroundColor?: string;
  textAlign?: "auto" | "center" | "justify" | "left" | "right";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  marginTop?: number;
  marginBottom?: number;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: "normal" | "italic" | "oblique";
  opacity?: number;
  padding?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  textShadowColor?: string;
  textShadowRadius?: number;
  textShadowOffset?: { width: number; height: number };
};
export const StyledText = styled.Text((props: TextProps) => ({
  color: props.color,
  textAlign: props.textAlign as any,
  fontWeight: props.fontWeight as any,
  marginTop: props.marginTop,
  marginBottom: props.marginBottom,
  fontFamily: props.fontFamily,
  fontSize: props.fontSize,
  fontStyle: props.fontStyle,
  opacity: props.opacity,
  padding: props.padding,
  backgroundColor: props.backgroundColor,
  left: props.left,
  right: props.right,
  top: props.top,
  bottom: props.bottom,
  //WARNING: Node of type rule not supported as an inline style
  textShadowColor: props.textShadowColor as any,
  textShadowRadius: props.textShadowRadius as any,
  textShadowOffset: props.textShadowOffset as any,
}));
