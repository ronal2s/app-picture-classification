import cardStyle from "@components/card/cardStyle";
import { StyledView } from "@components/styleds/styledView";
import constants from "@utils/constants";
import React from "react";

function MyCard({
  children,
  padding = constants.padding,
}: {
  children: any;
  padding?: number;
}) {
  return (
    <StyledView style={{ ...cardStyle.card, padding }}>
      <StyledView>{children}</StyledView>
    </StyledView>
  );
}

export default MyCard;
