import * as React from "react";
import {
  CalculatedField,
  FieldList,
  Inject,
  PivotViewComponent,
} from "@syncfusion/ej2-react-pivotview";
import { registerLicense } from "@syncfusion/ej2-base";
import { pivotData } from "./data";
import "@app/_styles/PivotTable/index.css";
import { JumboCard } from "@jumbo/components";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf0x0Qnxbf1x1ZFdMYF1bQHJPMyBoS35Rc0ViW39ecnRUQmReUURy"
);

let pivotDataX = [];
let _months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let _products = ["Haircut", "Manicure", "Padicure", "Hair Coloring"];

const PivotTable = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (var i = 0; i < 100; i++) {
    pivotDataX.push({
      Amount: getRandomInt(2, 15) * 100,
      Beautician: `Beautician ${getRandomInt(1, 5)}`,
      Date: "FY 2024",
      Product: _products[getRandomInt(0, 3)],
      Quantity: getRandomInt(10, 25),
      Month: _months[getRandomInt(0, 11)],
    });
  }

  const dataSourceSettings = {
    columns: [{ name: "Date", caption: "Date" }, { name: "Product" }],
    dataSource: pivotDataX,
    expandAll: false,
    filters: [],
    drilledMembers: [{ name: "Beautician", items: ["France"] }],
    formatSettings: [{ name: "Amount", format: "C0" }],
    rows: [{ name: "Beautician" }, { name: "Month" }],
    values: [
      { name: "Amount", caption: "Sold Amount" },
      { name: "Quantity", caption: "Quantity" },
    ],
  };
  let pivotObj;
  return (
    <JumboCard contentWrapper sx={{ height: "70vh" }}>
      <PivotViewComponent
        ref={(d) => (pivotObj = d)}
        id="PivotView"
        height={500}
        dataSourceSettings={dataSourceSettings}
        allowCalculatedField={true}
        showFieldList={true}
      >
        <Inject services={[CalculatedField, FieldList]} />
      </PivotViewComponent>
    </JumboCard>
  );
};

export default PivotTable;
