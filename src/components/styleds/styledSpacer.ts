import constants from "@utils/constants";
import styled from "styled-components/native";

type SpacerProps = {
  width?: number;
  height?: number;
};

export const StyledSpacer = styled.View(
  ({ height = constants.margin, width }: SpacerProps) => ({
    marginTop: height,
    marginBottom: height,
    marginLeft: width,
    marginRight: width,
  })
);
