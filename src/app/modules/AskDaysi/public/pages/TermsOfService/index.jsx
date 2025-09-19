import React from "react";
import TermsOfServiceContent from "../../components/TermsOfService";
import { Container } from "@mui/material";
import AskDaysiAppBar from "../../global/AppBar";

const TermsOfServicePage = () => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        padding: "0 !important",
        overflow: "hidden",
      }}
    >
      <AskDaysiAppBar />
      <Container sx={{ mt: 6 }}>
        <TermsOfServiceContent />
      </Container>
    </Container>
  );
};

export default TermsOfServicePage;
