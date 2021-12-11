import { StyledView } from "@components/styleds/styledView";
import { useRoute } from "@react-navigation/core";
import React from "react";
import PDFReader from "rn-pdf-reader-js";

function DocumentView() {
  const route = useRoute();
  const { document } = route.params as any;
  return (
    <StyledView flex={1}>
      <PDFReader
        source={{
          uri: document,
        }}
      />
    </StyledView>
  );
}

export default DocumentView;
