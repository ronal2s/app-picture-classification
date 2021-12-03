import FabButton from "@components/fabButton";
import ProductItem from "@components/productItem/productItem";
import { StyledView } from "@components/styleds/styledView";
import { useGlobalContext } from "@contexts/globalContext";
import FirebaseController from "@controllers/firebaseController";
import Product from "@models/product";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import constants from "@utils/constants";
import helpers from "@utils/helpers";
import Screens from "@utils/screens";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

// const data = require("./home.json");

const WIDTH = helpers.screen.width / 3 - 25;
const HEIGHT = helpers.screen.height / 6;

function HomeView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const globalContext = useGlobalContext();
  const user = globalContext?.content.user;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const firebaseController = FirebaseController.app();
    firebaseController
      .firestore()
      .collection("products")
      .where("userId", "==", user?.id)
      .onSnapshot((snapshot) => {
        let products = snapshot.docs.map((doc) => doc.data());
        products = products.filter((product) => !product.archived);
        setProducts(products as any as Product[]);
      });
  };

  const navigateToProductForm = () => {
    navigation.navigate(Screens.PRODUCT_FORM, {
      picture: "",
      classification: undefined,
    });
  };

  const openProduct = (product: Product) => {
    navigation.navigate(Screens.PRODUCT_FORM, {
      picture: product.picture,
      classification: undefined,
      existingItem: product,
    });
  };

  return (
    <StyledView flex={1}>
      <StyledView padding={constants.padding} alignItems="center">
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item, index }) => (
            <StyledView margin={4}>
              <ProductItem product={item} key={index} onPress={openProduct} />
            </StyledView>
          )}
          keyExtractor={(item) => item.id}
        />
      </StyledView>
      <FabButton onPress={navigateToProductForm} />
    </StyledView>
  );
}

export default HomeView;
