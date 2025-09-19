import React from "react";
import { NBContainer } from "@app/_styles/NewBusiness";
import { JumboCard } from "@jumbo/components";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const ServiceComplete = () => {
  return (
    <NBContainer>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap="30px"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: "100px" }} />
        <Typography variant="h2">Order Complete Successfully!</Typography>
      </Box>
    </NBContainer>
  );
};

export default ServiceComplete;
