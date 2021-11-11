import MyCard from "@components/card/card";
import FabButton from "@components/fabButton";
import ProductItem from "@components/productItem/productItem";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import FirebaseController from "@controllers/firebaseController";
import ProductController from "@controllers/productController";
import Product from "@models/product";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import constants from "@utils/constants";
import helpers from "@utils/helpers";
import Screens from "@utils/screens";
import React, { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";

// const data = require("./home.json");

const WIDTH = helpers.screen.width / 3 - 25;
const HEIGHT = helpers.screen.height / 6;

function HomeView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const firebaseController = FirebaseController.app();
    firebaseController
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => doc.data());
        setProducts(products as any as Product[]);
      });
  };

  const navigateToProductForm = () => {
    navigation.navigate(Screens.PRODUCT_FORM, {
      picture: "",
      classification: undefined,
    });
  };

  return (
    <StyledView flex={1}>
      {/* <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={({ item, index }) => (
          <StyledView margin={2}>
            <MyCard
              width={WIDTH}
              height={HEIGHT}
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image
                source={{ uri: item.picture }}
                style={{ width: 100, height: 100 }}
              />
              <StyledTitle textAlign="center">{item.name}</StyledTitle>
            </MyCard>
          </StyledView>
        )}
        keyExtractor={(item) => item.id}
      /> */}
      <StyledView padding={constants.padding}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item, index }) => (
            <ProductItem product={item} key={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      </StyledView>
      <FabButton onPress={navigateToProductForm} />
    </StyledView>
  );
}

export default HomeView;
