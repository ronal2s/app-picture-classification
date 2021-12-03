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

function ReportsView() {
  const globalContext = useGlobalContext();
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
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => doc.data());
        setProducts(products as any as Product[]);
      });
  };

  const onPressPDF = () => {
    setCurrentFormat("pdf");
  };

  const onPressXLS = () => {
    setCurrentFormat("excel");
  };

  const onGenerate = () => {
    setLoading(true);
    if (currentFormat === "pdf") {
      exportPDF(products, user);
    } else if (currentFormat === "excel") {
      exportExcel(products);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <StyledView flex={1} justifyContent="center" alignItems="center">
      <StyledTitle fontSize={24}>Seleccionar tipo de reporte</StyledTitle>
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
        <Button loading={loading} mode="contained" onPress={onGenerate}>
          Generar reporte
        </Button>
      )}
    </StyledView>
  );
}

export default ReportsView;
