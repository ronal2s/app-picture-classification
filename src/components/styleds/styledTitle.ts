import colors from "@utils/colors/colors";
import styled from "styled-components/native";

type TitleProps = {
  textAlign?: "left" | "center" | "right";
  fontSize?: number;
  color?: string;
  fontWeight?: any;
};

export const StyledTitle = styled.Text((props: TitleProps) => ({
  color: props.color ?? colors.grey[700],
  fontSize: props.fontSize ?? 18,
  fontWeight: props.fontWeight ?? ("500" as any),
  textAlign: props.textAlign || "left",
}));
