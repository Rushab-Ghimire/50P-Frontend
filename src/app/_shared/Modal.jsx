import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Padding } from "@mui/icons-material";

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <dialog
      className="modal"
      ref={dialog}
      onClose={onClose}
      style={{
        border: "none",
        padding: "40px 60px",
        borderRadius: "5px",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export function TFConfirmModal({
  isError,
  error,
  errorTitle = "",
  defaultErrorMessage = "",
  confirmTitle = "",
  confirmText = "",
  buttonLabels = ["Proceed", "Cancel"],
  isPending,
  handleStop,
  handle,
}) {
  console.log("isError", isError);
  return (
    <Modal onClose={handleStop}>
      {isError && (
        <ErrorBlock
          title={errorTitle.trim() != "" ? errorTitle : "Operation Failed"}
          message={
            error.info?.message ||
            (defaultErrorMessage.trim() != ""
              ? defaultErrorMessage
              : "Operation Failed. Please try again later.")
          }
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InfoOutlinedIcon
          color="error"
          sx={{ fontSize: "50px", marginBottom: "20px" }}
        />

        <Typography variant="h2" sx={{ fontWeight: "600" }}>
          {confirmTitle.trim() != "" ? confirmTitle : "Are you sure?"}
        </Typography>

        <Typography variant="p" sx={{ fontSize: "18px", marginBottom: "20px" }}>
          {confirmText.trim() != ""
            ? confirmText
            : "Do you really want to proceed?"}
        </Typography>

        <div className="form-actions">
          {isPending && <p>Please wait...</p>}
          {!isPending && (
            <>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={handleStop}
                  className="button-text"
                  variant="contained"
                  size="medium"
                  color="error"
                >
                  {buttonLabels[1]}
                </Button>
                <Button
                  onClick={handle}
                  className="button"
                  variant="contained"
                  size="medium"
                  color="success"
                >
                  {buttonLabels[0]}
                </Button>
              </Box>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
}
