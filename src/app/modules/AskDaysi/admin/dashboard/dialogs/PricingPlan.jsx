import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { ADPricingPlan } from "../components/PricingPlan";
import { Container } from "@mui/material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PricingPlanModal({ isDialogOpened, onDialogClosed, params=null }) {
  const [open, setOpen] = React.useState(isDialogOpened);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onDialogClosed();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
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
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <ADPricingPlan params={params} handleClose={handleClose} />
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
