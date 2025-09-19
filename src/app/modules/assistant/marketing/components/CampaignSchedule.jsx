import React from "react";
import { NBContainer, NBSectionTitle } from "@app/_styles/NewBusiness";
import { Box, Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CampaignSchedule = () => {
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
        <Typography variant="h2">Campaign Scheduled Successfully!</Typography>
      </Box>
    </NBContainer>
  );
};

export default CampaignSchedule;
