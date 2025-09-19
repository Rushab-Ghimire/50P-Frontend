import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Container, Stack } from "@mui/material";
import BookAppointmentSteps from "./BookAppointmentSteps";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { sweetAlerts } from "@app/_utilities/http.js";
import ReBookAppointmentSteps from "./ReBookAppointmentSteps";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReBookAppointment = ({ event, refreshFx, endEdit }) => {
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(1);

  useEffect(() => {
    handleClickOpen();
  }, [event]);

  const handleClickOpen = () => {
    setActiveStep((prevActiveStep) => 0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    endEdit();
  };

  //stepper
  const Swal = useSwalWrapper();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log("activeStepactiveStep", activeStep);
    if (activeStep == 2) {
      handleClose();
      sweetAlerts("success", "Booking Rescheduled !", Swal, theme);
      refreshFx();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <Stack>
              {activeStep > 0 && (
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              )}
            </Stack>
            <Stack>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
        </Container>
        <ReBookAppointmentSteps
          booking={event}
          steps={activeStep}
          nxtFxn={handleNext}
          closeFxn={handleClose}
        />
      </Dialog>
    </>
  );
};

export default ReBookAppointment;
