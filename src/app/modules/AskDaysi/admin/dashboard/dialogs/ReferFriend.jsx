import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Container } from "@mui/material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import ReferFriend from "../components/ReferFriend";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReferFriendModal = ({ isDialogOpened, onDialogClosed }) => {
  const [open, setOpen] = React.useState(isDialogOpened);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onDialogClosed();
    setOpen(false);
  };
  return (
    <>
      <Dialog
        // fullScreen
        fullWidth="fullWidth"
        maxWidth="md"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <ReferFriend />
        </Container>
      </Dialog>
    </>
  );
};

export default ReferFriendModal;
