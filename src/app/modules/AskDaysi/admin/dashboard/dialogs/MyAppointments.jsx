import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { useTheme } from "@mui/material";
import MyAppointmentsComponent from "../components/MyAppointments";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const MyAppointmentsDialog = ({
  isDialogOpened,
  handleCloseDialog,
  bookingDetail,
}) => {
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const theme = useTheme();
  const dialogStyles = {
    "& .MuiDialog-container": {
      width: "50%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "75%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };

  return (
    <Dialog
      fullScreen
      open={isDialogOpened}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={dialogStyles}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{
          position: "absolute",
          right: "20px",
          top: "20px",
          border: `1px solid ${Colors.black}`,
          padding: "3px",
          color: Colors.black,
        }}
      >
        <CloseIcon />
      </IconButton>
      <MyAppointmentsComponent bookingDetail={bookingDetail} />
    </Dialog>
  );
};

export default MyAppointmentsDialog;
