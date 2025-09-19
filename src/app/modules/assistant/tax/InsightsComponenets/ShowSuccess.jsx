import React from "react";
import { JumboCard } from "@jumbo/components";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ShowSuccess = () => {
  return (
    <JumboCard contentWrapper>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap="30px"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: "100px" }} />
        <Typography variant="h2">Documents uploaded successfully!</Typography>
      </Box>
    </JumboCard>
  );
};

export default ShowSuccess;
