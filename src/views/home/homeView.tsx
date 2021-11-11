import MyCard from "@components/card/card";
import FabButton from "@components/fabButton";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import helpers from "@utils/helpers";
import Screens from "@utils/screens";
import React from "react";
import { FlatList, Image } from "react-native";

const data = require("./home.json");

const WIDTH = helpers.screen.width / 3 - 25;
const HEIGHT = helpers.screen.height / 6;

function HomeView() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToProductForm = () => {
    navigation.navigate(Screens.PRODUCT_FORM, {
      picture: "",
      classification: undefined,
    });
  };

  return (
    <StyledView>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={({ item, index }) => (
          <StyledView margin={2}>
            <MyCard width={WIDTH} height={HEIGHT}>
              <Image
                source={{ uri: item.picture }}
                style={{ width: 100, height: 100 }}
              />
              <StyledTitle textAlign="center">
                Producto #{index + 1}
              </StyledTitle>
            </MyCard>
          </StyledView>
        )}
        keyExtractor={(item) => item.id}
      />
      <FabButton onPress={navigateToProductForm} />
    </StyledView>
  );
}

export default HomeView;
