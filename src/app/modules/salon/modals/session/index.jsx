import React, { useEffect, useState } from "react";
import { Button, Dialog, IconButton } from "@mui/material";
import Slide from "@mui/material/Slide";
import BookedServices from "./components/BookedServices";
import ServicesTotal from "./components/ServicesTotal";
import ServicesReceipt from "./components/ServicesReceipt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { BACloseIcon } from "@app/_styles/BookAppointment";
import ServiceComplete from "./components/ServiceComplete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogStyle = {
  "& .MuiPaper-root": {
    overflowY: "visible",
    maxWidth: "800px",
  },
};

const SessionFlow = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (activeStep === 3) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  });
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Session Flow Modal
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        sx={dialogStyle}
      >
        {activeStep < 3 && (
          <BACloseIcon onClick={handleClose}>
            <CancelOutlinedIcon sx={{ color: "#fff" }} />
          </BACloseIcon>
        )}
        {activeStep === 0 && <BookedServices fxn={handleNext} />}
        {activeStep === 1 && <ServicesTotal fxn={handleNext} />}
        {activeStep === 2 && <ServicesReceipt fxn={handleNext} />}
        {activeStep === 3 && <ServiceComplete />}
      </Dialog>
    </>
  );
};

export default SessionFlow;
