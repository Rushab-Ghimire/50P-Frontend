import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ErrorComponent = ({ title, message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 15px",
      }}
    >
      <CancelOutlinedIcon color="error" sx={{ fontSize: "50px" }} />
      <Typography
        variant="h2"
        sx={{ fontSize: "28px", mt: 2, textAlign: "center" }}
      >
        {title}
      </Typography>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
