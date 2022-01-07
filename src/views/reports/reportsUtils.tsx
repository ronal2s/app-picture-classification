import Product from "@models/product";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import { User } from "@models/user";
import { capitalizeText } from "@utils/helpers";
import { Alert } from "react-native";
import Screens from "@utils/screens";
import moment from "moment";

export const exportExcel = async (data: Product[]) => {
  let _data: any = [];
  data.forEach((item, key) => {
    _data[key] = {
      Marca: item.brand != "" ? capitalizeText(item.brand as string) : "-",
    };

    _data[key] = { ..._data[key], Producto: capitalizeText(item.name) };

    _data[key] = {
      ..._data[key],
      Descripción:
        item.description != ""
          ? capitalizeText(item.description as string)
          : "-",
    };

    _data[key] = {
      ..._data[key],
      Cantidad: item.quantity,
      Precio: parseFloat(item.price).toFixed(2),
    };
  });

  let ws = XLSX.utils.json_to_sheet(_data);

  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  // const uri = FileSystem.cacheDirectory + 'cities.xlsx';

  const uri = FileSystem.cacheDirectory + `reporte.xlsx`;
  console.log(uri);
  // console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "MyWater data",
    UTI: "com.microsoft.excel.xlsx",
  });
};

export const exportPDF = async (
  data: Product[],
  user: User,
  navigation: any
) => {
  const _cardsText = `${data.map((item, key) => {
    // if (key == data.length - 1) console.log("Una vez");
    // if (key > 5 && key % 12 == 0) return;
    return `    <div>
                <div style="display: flex; flex-direction: row; margin-top: 10px;">
                    <div style="width: 150px; height: 125px; background-color: #EEEEEE;">
                        
                          <img style="width: 150px; height: 125px; object-fit: cover;" src="${
                            item.picture
                          }" />
                    </div>
                    <div style="margin-left: 10px;">
                        <div style="margin-top: 5px;"></div>
                        <h3 style="margin: 0px; font-weight: 400;">${capitalizeText(
                          item.name
                        )}</h3>
                        <div style="margin-top: 5px;"></div>
                        <h3 style="margin: 0px; font-weight: 400;">${
                          item.brand != ""
                            ? capitalizeText(item.brand as string)
                            : "-"
                        }</h3>
                        <div style="margin-top: 10px;"></div>
                        
                        <span style="margin: 0px; font-weight: 400;">${
                          item.description != ""
                            ? capitalizeText(item.description as string)
                            : "-"
                        }</span>
                    </div>
                    <div style="position: absolute; right: 10px; text-align: right; ">
                        
                        <h5 style="margin: 0px; font-weight: 300; ">Cantidad</h5>
                        <h3 style="margin: 0px; font-weight: 400;">${
                          item.quantity
                        }</h3>
                        <div style="margin-top: 5px;"></div>
                        <h5 style="margin: 0px; font-weight: 300; ">Costo:</h5>
                        <h3 style="margin: 0px; font-weight: 400;">${parseFloat(
                          item.price
                        ).toFixed(2)}</h3>
                    </div>
                </div>
                              
                    
                ${
                  key > 5 &&
                  key % 12 == 0 &&
                  `<div style="width: 100%; height: 100px; background-color: white;" > </div>`
                }
                <div style="width: 100%; height: 2px; background-color: #333333; margin-top: ${
                  key % 5 == 0 ? `50px` : `20px`
                }px; " ></div>
                </div>`;
  })}`;

  let htmlData = `
    <html> 
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body style="margin: 0px" >
    <div>

        <div classname="Header" style="position: relative;background-color: white; width: 100%;height: 100px;">
            <div style="left: 39px;position: absolute;">
                <img style="width: 200px; height: 100px; object-fit: contain;"
                    src="https://firebasestorage.googleapis.com/v0/b/proyectofinal-aaf1b.appspot.com/o/logo1.png?alt=media&token=e4d4573a-0b1c-4df2-81f6-e177cf0c84d2">
            </div>
            <div style="position: absolute; right: 10px; text-align: right; ">
                <h3 style="color: #333333;">
                    ${"Reporte"}
                </h3>
                <h3 style="color: #333333;">
                    ${user.fullname}
                </h3>
                <h3 style="color: #333333;">
                    ${moment().format("DD/MM/YYYY HH:MM:SS")}
                </h3>
            </div>
        </div>
    </div>
    <div style="width: 100%; height: 15px; background-color: #115a5a; margin-top: 35px;"></div>
    
        ${_cardsText.replace(/,|undefined|false/g, "")}
        


        <div style="width: 100%; height: 15px; background-color: #115a5a; margin-top: 35px;"></div>
        </body>
        </html>
        `;

  const response = await Print.printToFileAsync({
    html: htmlData,
  });

  // this changes the bit after the last slash of the uri (the document's name) to "invoice_<date of transaction"

  const pdfName = `${response.uri.slice(
    0,
    response.uri.lastIndexOf("/") + 1
  )}Reporte.pdf`;

  await FileSystem.moveAsync({
    from: response.uri,
    to: pdfName,
    // to: FileSystem.
  });
  Alert.alert("Reporte generado", "¿Desea descargar el reporte?", [
    {
      text: "Descargar",
      onPress: async () => {
        Sharing.shareAsync(pdfName);
      },
    },
    {
      text: "Ver",
      onPress: () => {
        navigation.navigate(Screens.DOCUMENT_VIEW, {
          document: pdfName,
          canShare: true,
        });
      },
    },
    {
      text: "Cancelar",
    },
  ]);
};
