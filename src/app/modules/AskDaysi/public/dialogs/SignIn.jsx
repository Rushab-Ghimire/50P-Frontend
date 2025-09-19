import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AskDaysiSignIn from "../components/UserAccount/SignIn";
import { Colors } from "../../theme/colors";
import { useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SignInModal = ({ isDialogOpened, handleCloseDialog }) => {
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const theme = useTheme();
  const dialogStyle = {
    position: "absolute",
    right: "20px",
    top: "20px",
    border: `1px solid ${Colors.black}`,
    padding: "3px",
    color: Colors.black,
    zIndex: "9",
    [theme.breakpoints.down("md")]: {
      backgroundColor: Colors.gray,
    },
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
        sx={dialogStyle}
      >
        <CloseIcon />
      </IconButton>
      <AskDaysiSignIn />
    </Dialog>
  );
};

export default SignInModal;
