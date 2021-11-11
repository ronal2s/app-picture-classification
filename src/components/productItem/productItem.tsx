import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledView } from "@components/styleds/styledView";
import Product from "@models/product";
import colors from "@utils/colors/colors";
import { capitalizeText } from "@utils/helpers";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function ProductItem({
  product,
  onPress,
}: {
  product: Product;
  onPress?: (product: Product) => void;
}) {
  return (
    <StyledView>
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress(product);
          }
        }}
      >
        <StyledView
          style={{
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 5,
            shadowOpacity: 1,
            elevation: 5,
            shadowColor: colors.grey[400],
          }}
        >
          <StyledView position="absolute" top={50} left={25}>
            <StyledText color={colors.grey[500]}>Cargando</StyledText>
          </StyledView>
          <Image
            source={{ uri: product.picture }}
            style={{
              borderRadius: 10,
              width: 100,
              height: 100,
            }}
          />
        </StyledView>
      </TouchableOpacity>
      <StyledSpacer height={2} />
      <StyledView width={100}>
        <StyledText
          fontWeight="700"
          textAlign="center"
          color={colors.grey[700]}
        >
          {capitalizeText(product.name)}
        </StyledText>
      </StyledView>
    </StyledView>
  );
}

export default ProductItem;
