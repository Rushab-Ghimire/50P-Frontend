import React, { useEffect } from "react";
import { NBContainer } from "@app/_styles/NewBusiness";
import { JumboCard } from "@jumbo/components";
import { Box, CircularProgress, Typography } from "@mui/material";

const BusinessConnectingBank = ({ step }) => {
  return (
    <NBContainer>
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
    </NBContainer>
  );
};

export default BusinessConnectingBank;
