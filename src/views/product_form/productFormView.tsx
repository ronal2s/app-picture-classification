import DimissKeyboardView from "@components/dimissKeyboardView";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import ProductController from "@controllers/productController";
import { useRoute } from "@react-navigation/core";
import constants from "@utils/constants";
import SelectPictureView from "@views/product_form/components/selectPicture";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

function ProductFormView() {
  const route = useRoute();
  const { classification, picture: capturedPicture } = route.params as {
    classification: string;
    picture: string;
  };

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(capturedPicture);
  const [form, setForm] = useState({
    id: "",
    picture: image,
    name: "",
    brand: "",
    description: "",
    quantity: "",
    receiptUrl: "",
    price: "",
  });

  useEffect(() => {
    setImage(capturedPicture);
  }, [capturedPicture]);

  useEffect(() => {
    if (classification != undefined) onChangeClassification(classification);
  }, [classification]);

  const onChangeClassification = (name: string) => {
    setForm({ ...form, name });
  };

  const onChangePicture = (picture: string) => {
    setImage(picture);
  };

  const onChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };

  const clearForm = () => {
    setForm({
      id: "",
      picture: "",
      name: "",
      brand: "",
      description: "",
      quantity: "",
      receiptUrl: "",
      price: "",
    });
    setImage("");
  };

  const onSave = async () => {
    setLoading(true);
    await ProductController.add({ product: { ...form, picture: image } });
    clearForm();
    setLoading(false);
    Alert.alert("Produto guardado exitosamente");
  };

  return (
    <DimissKeyboardView scrollable>
      <SelectPictureView
        image={image}
        setImage={onChangePicture}
        onChangePicture={onChangePicture}
        onChangeClassification={onChangeClassification}
      />
      <StyledView padding={constants.padding} flex={1}>
        <MyTextInput
          name="name"
          value={form.name}
          label="Nombre"
          onChange={onChangeForm}
        />
        <MyTextInput
          name="brand"
          value={form.brand}
          label="Marca"
          onChange={onChangeForm}
        />
        <MyTextInput
          name="description"
          value={form.description}
          label="Descripción"
          onChange={onChangeForm}
        />
        <MyTextInput
          name="price"
          value={form.price}
          label="Precio"
          keyboardType="numeric"
          onChange={onChangeForm}
        />
        <MyTextInput
          name="quantity"
          value={form.quantity}
          label="Cantidad"
          keyboardType="numeric"
          onChange={onChangeForm}
        />
        <StyledSpacer />
        <Button loading={loading} mode="contained" onPress={onSave}>
          Guardar
        </Button>
      </StyledView>
    </DimissKeyboardView>
  );
}

export default ProductFormView;
