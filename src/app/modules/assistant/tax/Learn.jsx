import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { JumboCard } from "@jumbo/components";
import { Link } from "react-router-dom";
import { DzBasic } from "@app/_components/extensions/dropzone";
import { SalesReport1 } from "@app/_components/widgets/SalesReport1";
import { useTranslation } from "react-i18next";
import { Colors } from "@app/_themes/TileFlex";

const Learn = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant={"h2"} mb={3}>
        Notification - Learn More
      </Typography>
      <Typography
        variant="h1"
        sx={{ marginBottom: "25px", color: Colors.dark_blue }}
      >
        This deduction could save you $100
      </Typography>
      <DzBasic
        title="Upload receipts for better tracking"
        UploadAreaText="Drag 'n' drop file here, or click to select file"
      />
      <Box sx={{ marginTop: "25px" }}>
        <SalesReport1 title="Quarterly Report" />
      </Box>
    </>
  );
};

export default Learn;
