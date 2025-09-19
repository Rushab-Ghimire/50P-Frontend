import React from "react";
import { JumboCard } from "@jumbo/components";
import { Box, CircularProgress, Typography } from "@mui/material";

const ConnectingBank = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap="30px"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress size={100} />
      <Typography variant="h4">Connecting to your bank</Typography>
    </Box>
  );
};

export default ConnectingBank;
