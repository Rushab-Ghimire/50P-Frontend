import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { ColorLensTwoTone } from "@mui/icons-material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import CircularProgress from "@mui/material/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const listStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  width: "100%",
  marginTop: "15px",
};

const keywordsList = [
  {
    id: 1,
    title: "Keywords",
  },
  {
    id: 2,
    title: "Inquiring",
  },
  {
    id: 3,
    title: "about",
  },
  {
    id: 4,
    title: "potential",
  },
  {
    id: 5,
    title: "emergency",
  },
  {
    id: 6,
    title: "situation",
  },
  {
    id: 7,
    title: "alert",
  },
];

export default function KeywordsModal({
  isDialogOpened,
  handleCloseDialog,
  title,
}) {
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      handleCloseDialog(false);
      setSaving(false);
    }, 2000);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isDialogOpened}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Keywords in {title}</DialogTitle>
        <DialogContent>
          <Box sx={listStyle}>
            {keywordsList.map((data, index) => (
              <Stack
                sx={{
                  width: "fit-content",
                  border: "1px solid #ccc !important",
                  padding: "8px",
                  borderRadius: "8px",
                  position: "relative",
                }}
              >
                <Typography variant="h6" sx={{ mb: 0 }}>
                  {data.title}
                </Typography>
                <IconButton
                  size="small"
                  color="error"
                  aria-label="delete"
                  sx={{
                    position: "absolute",
                    right: "-19px",
                    top: "-18px",
                    zIndex: "5",
                  }}
                >
                  <RemoveCircleOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Box>
          {saving && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <CircularProgress sx={{ color: Colors.blue_1, mb: 1 }} />
              <Typography variant="h4">Saving Keywords</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: Colors.blue_1,
              "&:hover": {
                backgroundColor: Colors.blue,
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: Colors.blue_1,
              borderColor: Colors.blue_1,
              "&:hover": {
                borderColor: Colors.blue,
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
