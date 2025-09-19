import React from "react";
import {
  NBBtn,
  NBContainer,
  NBInput,
  NBSectionTitle,
} from "@app/_styles/NewBusiness";
import { JumboCard } from "@jumbo/components";
import { Box, TextField } from "@mui/material";
import { DzWithoutBg } from "@app/_components/extensions/dropzone/components/DzWithoutBg";

const BusinessLicense = () => {
  return (
    <NBContainer>
      <NBSectionTitle>Tax ID and Licensing</NBSectionTitle>
      <Box sx={{ minWidth: 120 }}>
        <form>
          <NBInput>Enter Your Tax Identification Number</NBInput>
          <TextField
            label="Enter Your TIN"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "25px" }}
          />
          <NBInput>Upload Your License Documents</NBInput>
          <DzWithoutBg UploadAreaText="Drag 'n' drop file here, or click to select file" />
        </form>
      </Box>
    </NBContainer>
  );
};

export default BusinessLicense;
