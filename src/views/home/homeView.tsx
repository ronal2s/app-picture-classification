import DimissKeyboardView from "@components/dimissKeyboardView";
import FabButton from "@components/fabButton";
import ProductItem from "@components/productItem/productItem";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledView } from "@components/styleds/styledView";
import { useGlobalContext } from "@contexts/globalContext";
import FirebaseController from "@controllers/firebaseController";
import Product from "@models/product";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import constants from "@utils/constants";
import helpers from "@utils/helpers";
import Screens from "@utils/screens";
import SearchInput from "@views/home/components/searchInput";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";

function HomeView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const globalContext = useGlobalContext();
  const user = globalContext?.content.user;
  const [products, setProducts] = useState<Product[]>([]);
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(filterText.toLowerCase()) ||
        product.brand?.toLowerCase().includes(filterText.toLowerCase()) ||
        product.description?.toLowerCase().includes(filterText.toLowerCase())
      );
    });
  }, [products, filterText]);

  useEffect(() => {
    fetchProducts();
  }, [user]);

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
      <DimissKeyboardView scrollable>
        <StyledView padding={constants.padding} alignItems="center">
          <SearchInput onChange={setFilterText} />
          <StyledSpacer />
          <FlatList
            data={filteredProducts}
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
      </DimissKeyboardView>
      <FabButton onPress={navigateToProductForm} />
    </StyledView>
  );
}

export default HomeView;
