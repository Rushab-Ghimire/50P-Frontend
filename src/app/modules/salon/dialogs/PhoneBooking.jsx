import React, { useState } from "react";
import Modal from "@app/_shared/Modal";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { Button, Container } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PhoneInput from "react-phone-input-2";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { PickersInputBaseSectionsContainer } from "@mui/x-date-pickers/PickersTextField/PickersInputBase/PickersInputBase";

const mb = {
  marginBottom: "25px",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PhoneBookingModal({
  isDialogOpened,
  handleCloseDialog,
}) {
  const handleClose = () => {
    handleCloseDialog(false);
  };
  return (
    <>
      <Dialog
        open={isDialogOpened}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <JumboForm>
            <JumboInput
              fullWidth
              fieldName="name"
              label="Name"
              placeholder="John doe"
              size="small"
              sx={mb}
            />
            <JumboInput
              fullWidth
              fieldName="email"
              label="Email"
              placeholder="demo@tileflexai.com"
              size="small"
              sx={mb}
            />
            <PhoneInput
              fullWidth
              size="small"
              international={true}
              withCountryCallingCode={true}
              country={"us"}
              className="mb-20"
              sx={{ marginBottom: "25px" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  onChange={(date) => {
                    setQueueDateTime((prev) => new Date(date));
                  }}
                  label="Select Date And Time"
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button variant="contained" size="small" sx={{ marginTop: "25px" }}>
              Submit
            </Button>
          </JumboForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
