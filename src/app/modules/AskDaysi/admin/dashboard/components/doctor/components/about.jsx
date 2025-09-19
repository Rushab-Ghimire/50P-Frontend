import React from "react";
import { Box, Typography } from "@mui/material";

const DoctorAbout = ({ contact }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h2">About</Typography>
      <Typography variant="h3" sx={{ fontSize: "18px" }}>
        {/* {contact.id}@askdaysi.com / Pw$@{contact.id}
        <br /> */}
        {contact.about}
      </Typography>
    </Box>
  );
};

export default DoctorAbout;
