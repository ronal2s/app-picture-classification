import * as Sharing from "expo-sharing";
import { StyledView } from "@components/styleds/styledView";
import { useRoute } from "@react-navigation/core";
import React from "react";
import { Button } from "react-native-paper";
import PDFReader from "rn-pdf-reader-js";

function DocumentView() {
  const route = useRoute();
  const { document, canShare } = route.params as any;
  const onDownload = () => {
    Sharing.shareAsync(document);
  };
  return (
    <StyledView flex={1}>
      <PDFReader
        source={{
          uri: document,
        }}
      />
      {canShare && (
        <Button mode="contained" onPress={onDownload}>
          Descargar
        </Button>
      )}
    </StyledView>
  );
}

export default DocumentView;
