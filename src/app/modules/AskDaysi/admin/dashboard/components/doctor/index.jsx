import React from "react";
import { Box, Divider } from "@mui/material";
import DoctorProfile from "./components/profile";
import DoctorAbout from "./components/about";
import DoctorEducationTraining from "./components/EducationTraining";
import DoctorInsuranceAccepted from "./components/InsuranceAccepted";
import DoctorReviews from "./components/reviews";

const DoctorDetail = ({ contact, openBookingForm }) => {
  return (
    <Box sx={{ p: 4 }}>
      <DoctorProfile openBookingForm={openBookingForm} contact={contact} />
      <Divider sx={{ padding: "10px 0" }} />
      <DoctorAbout contact={contact} />
      <Divider sx={{ padding: "10px 0" }} />
      <DoctorEducationTraining contact={contact} />
      <Divider sx={{ padding: "10px 0" }} />
      <DoctorInsuranceAccepted contact={contact} />
      <Divider sx={{ padding: "10px 0" }} />
      <DoctorReviews contact={contact} />
    </Box>
  );
};

export default DoctorDetail;
