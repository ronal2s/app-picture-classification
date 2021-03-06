import { StyledText } from "@components/styleds/styledText";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import React, { useEffect, useState } from "react";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { Button } from "react-native-paper";
import { exportExcel, exportPDF } from "@views/reports/reportsUtils";
import Product from "@models/product";
import FirebaseController from "@controllers/firebaseController";
import { useGlobalContext } from "@contexts/globalContext";
import { User } from "@models/user";
import { useNavigation } from "@react-navigation/core";
import showToast from "@contexts/useToast";

function ReportsView() {
  const globalContext = useGlobalContext();
  const navigation = useNavigation();
  const user = globalContext?.content.user as User;
  const [currentFormat, setCurrentFormat] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const firebaseController = FirebaseController.app();
    firebaseController
      .firestore()
      .collection("products")
      .where("userId", "==", user?.id)
      .where("archived", "==", false)
      .onSnapshot((snapshot) => {
        let products = snapshot.docs.map((doc) => doc.data());
        // products = products.filter((product) => !product.archived);
        setProducts(products as any as Product[]);
      });
  };

  const onPressPDF = () => {
    setCurrentFormat("pdf");
  };

  const onPressXLS = () => {
    setCurrentFormat("excel");
  };

  const onGenerate = async () => {
    if (products.length) {
      setLoading(true);
      if (currentFormat === "pdf") {
        await exportPDF(products, user, navigation);
        // setTimeout(() => setLoading(false), 20000);
      } else if (currentFormat === "excel") {
        await exportExcel(products);
        // setTimeout(() => setLoading(false), 5000);
      }
      setLoading(false);
    } else {
      showToast({
        message: "No hay productos para exportar",
        color: colors.error,
      });
    }
  };

  return (
    <StyledView flex={1} justifyContent="center" alignItems="center">
      <StyledTitle fontSize={24}>Seleccionar tipo</StyledTitle>
      <StyledSpacer />
      <StyledView
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "90%",
        }}
      >
        <TouchableOpacity onPress={onPressPDF}>
          <Icon
            name="file-pdf-o"
            size={80}
            color={currentFormat == "pdf" ? colors.primary : colors.grey[500]}
          />
          <StyledText textAlign="center" color="grey">
            PDF
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressXLS}>
          <Icon
            name="file-excel-o"
            size={80}
            color={currentFormat == "excel" ? colors.primary : colors.grey[500]}
          />
          <StyledText textAlign="center" color="grey">
            Excel
          </StyledText>
        </TouchableOpacity>
      </StyledView>
      <StyledSpacer />
      {currentFormat != "" && (
        <Button
          loading={loading}
          color={colors.secondary}
          mode="contained"
          onPress={onGenerate}
        >
          Generar reporte
        </Button>
      )}
    </StyledView>
  );
}

export default ReportsView;
