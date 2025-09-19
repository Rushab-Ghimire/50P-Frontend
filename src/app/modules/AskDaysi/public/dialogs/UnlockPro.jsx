import * as React from "react";
import Button from "@mui/material/Button";
import logo from "/assets/images/askdaysi/global/logo.png";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { ADProBlock } from "../../styles/chat";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import SignInModal from "./SignIn";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
const UnlockProDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, loading, userDetail } = useAuth();
  const handleOpen = () => {
    setIsOpen(!isOpen);
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!isAuthenticated && open && (
        <Fade in timeout={1000}>
          <Box sx={{ position: "absolute", right: "0", bottom: "0" }}>
            <ADProBlock>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  border: `1px solid ${Colors.black}`,
                  padding: "2px",
                  color: Colors.black,
                }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100px", marginBottom: "20px" }}
              />
              <Typography variant="h4">Sign In or Create an Account</Typography>
              <Typography variant="h6">
                Unlock Pro Search and History
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ marginTop: "20px", backgroundColor: Colors.secondary }}
                onClick={() => handleOpen()}
              >
                Sign In
              </Button>
            </ADProBlock>
          </Box>
        </Fade>
      )}
      <SignInModal
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
};

export default UnlockProDialog;
