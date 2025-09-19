import { JumboCard } from "@jumbo/components";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const DocUploading = () => {
  return (
    <JumboCard contentWrapper>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap="30px"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress size={100} />
        <Typography variant="h4">Uploading your document</Typography>
      </Box>
    </JumboCard>
  );
};

export default DocUploading;
