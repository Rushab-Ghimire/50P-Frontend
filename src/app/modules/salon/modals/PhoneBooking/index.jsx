import React, { useState } from "react";
import AlertDialog from "../../dialogs/alert";
import ContentDialog from "../../dialogs/content";
import SubscribeDialog from "../../dialogs/subscribe";
import PhoneBookingModal from "../../dialogs/PhoneBooking";
import { Button, Container } from "@mui/material";

const PhoneBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [isOpenThree, setIsOpenThree] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenOne = () => {
    setIsOpenOne(!isOpenOne);
  };
  const handleOpenTwo = () => {
    setIsOpenTwo(!isOpenTwo);
  };
  const handleOpenThree = () => {
    setIsOpenThree(!isOpenThree);
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Button variant="outlined" onClick={() => handleOpen()}>
        Open Alert Dialog
      </Button>
      <Button variant="outlined" onClick={() => handleOpenOne()}>
        Open Content Dialog
      </Button>
      <Button variant="outlined" onClick={() => handleOpenTwo()}>
        Open Subscribe Dialog
      </Button>
      <Button variant="outlined" onClick={() => handleOpenThree()}>
        Open Phone Booking Dialog
      </Button>
      <AlertDialog
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      <ContentDialog
        isDialogOpened={isOpenOne}
        handleCloseDialog={() => setIsOpenOne(false)}
      />
      <SubscribeDialog
        isDialogOpened={isOpenTwo}
        handleCloseDialog={() => setIsOpenTwo(false)}
      />
      <PhoneBookingModal
        isDialogOpened={isOpenThree}
        handleCloseDialog={() => setIsOpenThree(false)}
      />
    </Container>
  );
};

export default PhoneBooking;
