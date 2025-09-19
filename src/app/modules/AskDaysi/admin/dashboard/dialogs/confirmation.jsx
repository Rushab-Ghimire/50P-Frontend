import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Icon, Typography } from "@mui/material";
import { position } from "stylis";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "@app/_themes/TileFlex";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({
  isDialogOpened,
  handleCloseDialog,
  icon,
  title,
  description,
  iconColor,
  children,
}) {
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const iconStyle = {
    color: iconColor,
    fontSize: "63px",
    "& svg": {
      fontSize: "60px",
      position: "relative",
      top: "-1px",
    },
  };

  return (
    <React.Fragment>
      <Dialog
        open={isDialogOpened}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: "5px",
            top: "5px",
            padding: "3px",
            color: Colors.black,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ textAlign: "center", padding: "20px" }}>
          <Icon sx={iconStyle}>{icon}</Icon>
          <Typography variant="h2" sx={{ fontSize: "28px", mt: 2 }}>
            {title}
          </Typography>
          <Typography variant="h3">{description}</Typography>
        </Box>
        {children !== undefined && (
          <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
            {children}
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  );
}
