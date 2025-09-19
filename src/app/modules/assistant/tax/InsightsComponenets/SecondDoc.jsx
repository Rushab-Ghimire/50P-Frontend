import { DzBasic } from "@app/_components/extensions/dropzone";
import { Box, Button } from "@mui/material";
import React from "react";

const SecondDoc = ({ fxn }) => {
  return (
    <Box>
      <DzBasic
        title="Upload Second Document"
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

export default SecondDoc;
