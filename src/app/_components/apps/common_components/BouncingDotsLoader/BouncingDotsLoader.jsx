import React from "react";
import { Div } from "@jumbo/shared";
import "./BouncingDotsLoaderDesign.css";

const BouncingDotsLoader = (props) => {
  return (
    <Div
      className="bouncing-loader"
      sx={{ paddingTop: "11px", paddingLeft: "3px" }}
    >
      <div></div>
      <div></div>
      <div></div>
    </Div>
  );
};

export { BouncingDotsLoader };
