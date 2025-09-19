import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Colors } from "../../theme/colors";
import { Box, Container, Divider, Typography } from "@mui/material";
import AboutFourBlocks from "../components/about/FourBlocks";
import AboutContactForm from "../components/about/ContactForm";
import Footer from "../global/footer";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AskDaysiAbout = ({ isDialogOpened, handleCloseDialog }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    handleCloseDialog(false);
  };

  return (
    <Dialog
      fullScreen
      open={isDialogOpened}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{
          position: "fixed",
          right: "30px",
          top: "20px",
          border: `1px solid ${Colors.black}`,
          padding: "3px",
          color: Colors.black,
          backgroundColor: Colors.white,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Container sx={{ py: 10 }}>
        <Box textAlign={"center"} sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: "500" }}>
            {t("about.title")}
          </Typography>
          <Typography variant="h3">{t("about.subtitle")}</Typography>
        </Box>
        <AboutFourBlocks />
        <Divider sx={{ mt: 3 }} />
        <AboutContactForm />
      </Container>
      <Footer />
    </Dialog>
  );
};

export default AskDaysiAbout;
