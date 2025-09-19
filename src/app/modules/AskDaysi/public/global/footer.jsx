import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  ADFooterContainer,
  ADFooterCopy,
  ADFooterWrapper,
} from "../../styles/global/footer";
import AskDaysiAbout from "../dialogs/about";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import AskDaysiTermsOfService from "../dialogs/TermsOfService";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isTerms, setIsTerms] = useState(false);
  const handleTerms = () => {
    setIsTerms(!isTerms);
  };

  const { t } = useTranslation();

  return (
    <ADFooterWrapper maxWidth="100%">
      <Container maxWidth="xl">
        <ADFooterContainer>
          <Stack>
            <ADFooterCopy>
              <CopyrightOutlinedIcon
                sx={{ position: "relative", top: "4px", fontSize: "18px" }}
              />{" "}
              {year} TileFlexAI. All rights reserved.
            </ADFooterCopy>
          </Stack>
          <Stack>
            <Typography
              variant="h4"
              onClick={() => handleTerms()}
              sx={{ mt: 2, mb: 0, cursor: "pointer" }}
            >
              {t("terms.pageTitle")}
            </Typography>
          </Stack>
        </ADFooterContainer>
        <AskDaysiAbout
          isDialogOpened={isOpen}
          handleCloseDialog={() => setIsOpen(false)}
        />
        <AskDaysiTermsOfService
          isDialogOpened={isTerms}
          handleCloseDialog={() => setIsTerms(false)}
        />
      </Container>
    </ADFooterWrapper>
  );
};

export default Footer;
