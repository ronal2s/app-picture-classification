import DimissKeyboardView from "@components/dimissKeyboardView";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledTextError } from "@components/styleds/styledTextError";
import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import ProductController from "@controllers/productController";
import Product from "@models/product";
import { useRoute } from "@react-navigation/core";
import constants from "@utils/constants";
import SelectPictureView from "@views/product_form/components/selectPicture";
import productHelper from "@views/product_form/productFormHelper";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

function ProductFormView() {
  const route = useRoute();
  const {
    classification = undefined,
    picture: capturedPicture = "",
    existingItem,
  } = route.params as {
    classification: string;
    picture: string;
    existingItem?: Product;
  };

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(capturedPicture);
  const [errors, setErrors] = useState({ ...productHelper.requeridedFields });
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
    if (existingItem) {
      setForm({ ...(existingItem as any) });
    }
  }, [existingItem]);

  useEffect(() => {
    setImage(capturedPicture);
  }, [capturedPicture]);

  useEffect(() => {
    if (classification != undefined) {
      // if (classification == "" && !existingItem) {
      onChangeClassification(classification);
      // }
    }
  }, [classification]);

  const onChangeClassification = (name: string) => {
    if (name == "" && existingItem) {
      setForm({ ...form, name: existingItem.name });
    } else {
      setForm({ ...form, name });
    }
  };

  const onChangePicture = (picture: string) => {
    if (picture == "" && existingItem) {
      setImage(existingItem.picture);
    } else {
      setImage(picture);
    }
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
    const anyErrors = productHelper.validateErrors({ ...form, picture: image });
    setErrors({ ...anyErrors });
    if (anyErrors.canContinue) {
      setLoading(true);
      await ProductController.add({ product: { ...form, picture: image } });
      clearForm();
      setLoading(false);
      Alert.alert("Produto guardado exitosamente");
    }
  };

  const onEdit = async () => {
    const anyErrors = productHelper.validateErrors({ ...form, picture: image });
    setErrors({ ...anyErrors });
    if (anyErrors.canContinue) {
      setLoading(true);
      await ProductController.update({ product: { ...form, picture: image } });
      // clearForm();
      setLoading(false);
      Alert.alert("Produto editado exitosamente");
    }
  };

  return (
    <DimissKeyboardView scrollable>
      <SelectPictureView
        image={image}
        existingItem={existingItem}
        setImage={onChangePicture}
        onChangePicture={onChangePicture}
        onChangeClassification={onChangeClassification}
      />
      <StyledView padding={constants.padding} flex={1}>
        {Boolean(errors.picture) && (
          <StyledTextError>{errors.picture}</StyledTextError>
        )}
        <MyTextInput
          name="name"
          value={form.name}
          label="Nombre"
          error={errors.name}
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
          error={errors.price}
          onChange={onChangeForm}
        />
        <MyTextInput
          name="quantity"
          value={form.quantity}
          label="Cantidad"
          keyboardType="numeric"
          error={errors.quantity}
          onChange={onChangeForm}
        />
        <StyledSpacer />

        {!existingItem && (
          <Button loading={loading} mode="contained" onPress={onSave}>
            Guardar
          </Button>
        )}
        {existingItem && (
          <Button loading={loading} mode="contained" onPress={onEdit}>
            Editar
          </Button>
        )}
      </StyledView>
    </DimissKeyboardView>
  );
}

export default ProductFormView;
