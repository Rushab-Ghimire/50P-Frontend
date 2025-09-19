import React from "react";
import MyProfile from "./components/profile";
import { Box } from "@mui/material";

const MyAppointmentsComponent = ({ bookingDetail }) => {
  return (
    <>
      <Box sx={{ p: 4 }}>
        <MyProfile bookingDetail={bookingDetail} />
      </Box>
    </>
  );
};

export default MyAppointmentsComponent;
