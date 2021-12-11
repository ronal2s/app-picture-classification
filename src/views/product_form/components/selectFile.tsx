import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledText } from "@components/styleds/styledText";
import { StyledView } from "@components/styleds/styledView";
import colors from "@utils/colors/colors";
import helpers from "@utils/helpers";
import React, { useEffect } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/core";
import Screens from "@utils/screens";

function SelectFile({
  onSelected,
  defaultFile,
  defaultName,
}: {
  onSelected?: ({ uri, name }: { uri: string; name: string }) => void;
  defaultFile?: string;
  defaultName?: string;
}) {
  const navigation = useNavigation<any>();
  const [file, setFile] = React.useState<string | undefined>(defaultFile);
  const [fileName, setFileName] = React.useState<string | undefined>(
    defaultName
  );

  useEffect(() => {
    setFile(defaultFile);
    setFileName(defaultName);
  }, [defaultFile, defaultName]);

  const askForFile = async () => {
    Alert.alert(
      "Advertencia",
      "Un archivo ya ha sido seleccionado anteriormente",
      [
        {
          text: "Reemplazar",
          onPress: () => onSelectFile(false),
        },
        {
          text: "Ver",
          onPress: openDocument,
        },
        {
          text: "Eliminar",
          onPress: () => {
            setFile(undefined);
            setFileName(undefined);
          },
        },
      ]
    );
  };

  const onSelectFile = async (replace?: boolean) => {
    if (file && replace) {
      askForFile();
      return;
    }
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "application/pdf",
    });
    if (result.type === "success") {
      setFile(result.uri);
      setFileName(result.name);
      onSelected && onSelected({ uri: result.uri, name: result.name });
    }
  };

  const openDocument = async () => {
    navigation.navigate(Screens.DOCUMENT_VIEW, { document: file });
  };

  return (
    <StyledView>
      <StyledView
        borderColor={colors.grey[400]}
        borderRadius={10}
        borderWidth={1}
        height={helpers.screen.height * 0.23}
      >
        <StyledView>
          <StyledSpacer />
          <StyledText
            fontSize={16}
            textAlign="center"
            fontWeight="bold"
            color={colors.grey[700]}
          >
            {file ? "Modificar documento" : "Seleccionar documento"}
          </StyledText>
        </StyledView>
        <StyledView position="relative" alignSelf="center" top={-40}>
          <TouchableOpacity onPress={() => onSelectFile(true)}>
            <IconButton
              icon="file"
              color={file ? colors.primary : colors.grey[500]}
              size={helpers.screen.height * 0.15}
            />
          </TouchableOpacity>
        </StyledView>
        <StyledView position="relative" alignSelf="center" top={-80}>
          <StyledText
            fontSize={16}
            textAlign="center"
            fontWeight="200"
            color={colors.grey[700]}
          >
            {fileName ? fileName : "No se ha seleccionado ningún archivo"}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default SelectFile;
