import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import constants from "@utils/constants";
import SelectPictureView from "@views/product_form/components/selectPicture";
import React, { useState } from "react";

function ProductFormView() {
  const [form, setForm] = useState({
    picture: "",
    name: "",
  });

  const onChangeClassification = (name: string) => {
    setForm({ ...form, name });
  };

  const onChangeForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <StyledView>
      <SelectPictureView onChangeClassification={onChangeClassification} />
      <StyledView padding={constants.padding}>
        <MyTextInput
          name="name"
          value={form.name}
          label="Nombre"
          onChange={onChangeForm}
        />

        <StyledView></StyledView>
      </StyledView>
    </StyledView>
  );
}

export default ProductFormView;
