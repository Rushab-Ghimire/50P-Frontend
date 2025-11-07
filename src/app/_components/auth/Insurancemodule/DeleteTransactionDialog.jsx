import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export default function DeleteTransactionDialog({ open, handleClose, handleConfirm }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Are you sure you want to delete this transaction?
      </DialogTitle>
      <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          sx={{ borderRadius: "18px", px: 3 }}
        >
          Delete
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
export {DeleteTransactionDialog};