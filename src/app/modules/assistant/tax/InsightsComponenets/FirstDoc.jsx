import React from "react";
import { DzBasic } from "@app/_components/extensions/dropzone";
import { Box, Button } from "@mui/material";

const FirstDoc = ({ fxn }) => {
  return (
    <Box>
      <DzBasic
        title="You’ve logged significant travel expenses. Did you know you can deduct
        business mileage?"
        SubTitle="Upload Document"
        UploadAreaText="Drag 'n' drop file here, or click to select file"
      />
      <Box sx={{ marginTop: "25px" }}>
        <Button variant="contained" color="primary" onClick={fxn}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default FirstDoc;
