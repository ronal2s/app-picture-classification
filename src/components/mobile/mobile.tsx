import { StyledView } from "@components/styleds/styledView";
import MyTextInput from "@components/textInput/textInput";
import React, { useRef } from "react";
import { TextInput } from "react-native";

function MobileInput({
  onChange,
  defaultValue = { areaCode: "+1", number: "" },
}: {
  onChange?: (mobile: { areaCode: string; number: string }) => void;
  defaultValue?: { areaCode: string; number: string };
}) {
  const refInputNumber = useRef<TextInput>();

  const [mobile, setMobile] = React.useState(defaultValue);

  const onChangeMobile = (value: string, name: string) => {
    setMobile({ ...mobile, [name]: value });
    if (onChange) onChange({ ...mobile, [name]: value });
  };

  return (
    <StyledView>
      <StyledView
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <MyTextInput
          label=" "
          name="areaCode"
          backgroundColor="rgba(255,255,255,0.35)"
          value={mobile.areaCode}
          onChange={onChangeMobile}
          returnKeyType="next"
          onSubmitEditing={() => {
            refInputNumber.current?.focus();
          }}
        />
        <StyledView flex={2}>
          <MyTextInput
            label="Teléfono"
            name="number"
            value={mobile.number}
            backgroundColor="rgba(255,255,255,0.35)"
            keyboardType="numeric"
            setRef={(ref) => (refInputNumber.current = ref)}
            onChange={onChangeMobile}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default MobileInput;
