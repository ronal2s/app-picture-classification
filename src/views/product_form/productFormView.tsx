import DimissKeyboardView from "@components/dimissKeyboardView";
import DropDown from "@components/dropdown";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledTextError } from "@components/styleds/styledTextError";
import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import { useGlobalContext } from "@contexts/globalContext";
import ProductController from "@controllers/productController";
import Product from "@models/product";
import { useNavigation, useRoute } from "@react-navigation/core";
import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import SelectPictureView from "@views/product_form/components/selectPicture";
import productHelper from "@views/product_form/productFormHelper";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";

const options = [
  { label: "Smartphone", value: "cellphone" },
  { label: "Smartwatch", value: "digitalwatch" },
  { label: "Headphone", value: "headphone" },
  { label: "Laptop", value: "laptop" },
  { label: "Speaker", value: "speaker" },
  { label: "Tablet", value: "tablet" },
  { label: "Television", value: "television" },
];

function ProductFormView() {
  const navigation = useNavigation();
  const route = useRoute();
  const globalContext = useGlobalContext();
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
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [form, setForm] = useState({
    id: "",
    picture: image,
    name: "",
    brand: "",
    description: "",
    quantity: "",
    receiptUrl: "",
    price: "",
    classification,
  });

  useEffect(() => {
    setForm({
      ...form,
      classification: globalContext?.content.currentClassification,
    });
  }, [globalContext?.content.currentClassification]);

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
      onChangeClassification(classification);
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
      classification: "",
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

  const requestProductPrice = async () => {
    setLoadingPrice(true);
    setTimeout(() => setLoadingPrice(false), 1000);
    const response = await fetch(
      `https://invntryapp.herokuapp.com/requestProduct?name=${form.name}&brand=${form.brand}`
    );
    const data = await response.json();
    setForm({ ...form, price: data.result.toFixed(2) });
    setLoadingPrice(false);
  };

  const onArchive = () => {
    Alert.alert("Advertencia", "¿Esta seguro de eliminar este producto?", [
      {
        text: "Aceptar",
        onPress: () => {
          ProductController.update({
            product: { ...form, archived: true },
          });
          navigation.goBack();
        },
      },
      { text: "Cancelar" },
    ]);
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
        {/* <MyTextInput
          name="name"
          value={form.name}
          label="Nombre"
          error={errors.name}
          onChange={onChangeForm}
        /> */}

        <DropDown
          label="Nombre"
          value={form.name}
          list={options}
          onChange={(testing) => {
            setForm({ ...form, name: testing });
          }}
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
        <StyledView>
          <MyTextInput
            name="price"
            value={form.price}
            label="Precio"
            keyboardType="numeric"
            error={errors.price}
            onChange={onChangeForm}
          />
          <StyledView position="absolute" right={10} top={10}>
            {loadingPrice && <ActivityIndicator style={{ top: 10 }} />}
            {!loadingPrice && (
              <IconButton
                icon="magnify"
                color={colors.grey[500]}
                onPress={requestProductPrice}
              />
            )}
          </StyledView>
        </StyledView>
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
        <StyledSpacer height={2} />
        {existingItem && (
          <Button color={colors.red[500]} onPress={onArchive}>
            Eliminar
          </Button>
        )}
      </StyledView>
    </DimissKeyboardView>
  );
}

export default ProductFormView;
