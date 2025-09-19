import React, { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, useTheme } from "@mui/material";
import PatientBooking from "../components/PatientBooking";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

var showChat = false;
const PatientBookingDetails = ({
  isDialogOpened,
  handleCloseDialog,
  bookingDetail,
  fromQueue = false,
  queueId,
}) => {
  const theme = useTheme();
  //const [showChat, setShowChat] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const dialogStylesChat = {
    "& .MuiDialog-container": {
      width: "95%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };
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

  const handleClose = () => {
    showChat = false;
    handleCloseDialog(false);
  };

  const chatDisplay = (ch) => {
    showChat = ch;
    setRefresh(refresh + 1);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isDialogOpened}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={showChat ? dialogStylesChat : dialogStyles}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            // inset: "5px 0 0 15px",
            left: "15px",
            top: "5px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <PatientBooking
          fromQueue={fromQueue}
          queueId={queueId}
          handleClose={handleClose}
          bookingDetail={bookingDetail}
          chatDisplay={chatDisplay}
        />
      </Dialog>
    </>
  );
};

export default PatientBookingDetails;
