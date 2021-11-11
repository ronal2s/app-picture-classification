import colors from "@utils/colors/colors";
import styled from "styled-components/native";

export const StyledTextError = styled.Text(
  ({
    textAlign = "left",
  }: {
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
  }) => ({
    color: colors.red[500],
    textAlign: textAlign as any,
  })
);
