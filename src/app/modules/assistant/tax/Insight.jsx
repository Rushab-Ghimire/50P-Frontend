import React, { useState } from "react";
import { Typography } from "@mui/material";
import { JumboCard } from "@jumbo/components";
import { Link } from "react-router-dom";
import { DzBasic } from "@app/_components/extensions/dropzone";
import FirstDoc from "./InsightsComponenets/FirstDoc";
import { Colors } from "@app/_themes/TileFlex";
import SecondDoc from "./InsightsComponenets/SecondDoc";
import DocUploading from "./InsightsComponenets/DocUploading";
import ShowSuccess from "./InsightsComponenets/ShowSuccess";

const Insight = () => {
  const [showFirstDoc, setShowFirstDoc] = useState(true);
  const [showSecondDoc, setShowSecondDoc] = useState(false);
  const [showDocUploading, setShowDocUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showSecondUpload = () => {
    setShowFirstDoc(false);
    setShowDocUploading(true);
    setTimeout(() => {
      setShowDocUploading(false);
      setShowSecondDoc(true);
    }, 2000);
  };

  const showSuccessMessage = () => {
    setShowSecondDoc(false);
    setShowDocUploading(true);
    setTimeout(() => {
      setShowDocUploading(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <>
      <Typography variant={"h2"} mb={3}>
        Notification - Act Now
      </Typography>
      {showFirstDoc && <FirstDoc fxn={showSecondUpload} />}
      {showSecondDoc && <SecondDoc fxn={showSuccessMessage} />}
      {showDocUploading && <DocUploading />}
      {showSuccess && <ShowSuccess />}
    </>
  );
};

export default Insight;
