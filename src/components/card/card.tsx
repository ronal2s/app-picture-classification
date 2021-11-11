import cardStyle from "@components/card/cardStyle";
import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

function MyCard({
  children,
  padding = constants.padding,
  width,
  height,
  centered,
  style,
  shadowColor = colors.grey[400],
}: {
  children: any;
  padding?: number;
  width?: number;
  height?: number;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
  shadowColor?: string;
}) {
  const centeredStyle = centered
    ? { justifyContent: "center", alignItems: "center" }
    : ({} as any);

  return (
    <StyledView
      style={{
        ...cardStyle.card,
        padding,
        shadowColor,
        // ...centeredStyle,
        ...(style as any),
      }}
    >
      <StyledView style={{ ...centeredStyle, width, height }}>
        {children}
      </StyledView>
    </StyledView>
  );
}

export default MyCard;
