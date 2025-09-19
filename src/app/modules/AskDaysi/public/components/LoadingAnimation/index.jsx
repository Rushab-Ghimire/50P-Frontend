import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

const LoadingAnimation = ({ searchText }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h3">{searchText}</Typography>
    </Box>
  );
};

export default LoadingAnimation;
