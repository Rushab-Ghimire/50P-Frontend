import React, { useCallback, useState } from "react";
import { TextField, IconButton, Box, Icon, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { postToBot } from "@app/_utilities/http";

const actionIcons = [
  {
    action: "VIEW",
    icon: <VisibilityOutlinedIcon sx={{ color: "#268ccc" }} />,
    tooltip: "View",
  },
  {
    action: "SUMMARIZE",
    icon: <SummarizeOutlinedIcon sx={{ color: "#6dcff6" }} />,
    tooltip: "Summarize",
  },
  {
    action: "EMAIL",
    icon: <EmailOutlinedIcon sx={{ color: "#3BD2A2" }} />,
    tooltip: "Email",
  },
  {
    action: "DELETE",
    icon: <DeleteOutlineOutlinedIcon sx={{ color: "#FF6A70" }} />,
    tooltip: "Delete",
  },
];

const ChatInputBox = ({ file, handleClose }) => {
  const deleteTrainingFile = useCallback(async () => {
    window.deleteTrainingFileFromList(file.id);
    window.sendMessage(`Deleting file - ${file.title}`, false, [], true);
    var response = await postToBot({
      inData: {},
      path: `/vector_stores/files/${file.id}/delete`,
    });
  });

  const viewTrainingFile = useCallback(async () => {
    window.open(file.url, "_blank");
    window.sendMessage(`Viewing file - ${file.title}`, false, [], true);
  });

  const summarizeTrainingFile = useCallback(async () => {
    window.sendMessage(`Summarizing file - ${file.title}`, false, [], true);
    window.sendMessage(`Summarize this file - ${file.title}`, true, [], false);
  });

  const emailTrainingFile = useCallback(async () => {
    //console.log("eeeee", file);
    //window.sendMessage(`Emailing file - ${file.title}`, false, [], true);
    window.sendMessage(`__EMAIL_FORM__`, false, [], true, file);
  });

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "15px",
        padding: "12px",
        position: "relative",
        marginBottom: "20px",
      }}
    >
      {/* CLOSE BUTTON */}
      <IconButton
        sx={{ position: "absolute", top: "0px", right: "0px", zIndex: 9 }}
        onClick={handleClose}
      >
        <CancelOutlinedIcon />
      </IconButton>
      <Box display="flex" alignItems="center">
        <TextField
          value={file?.title}
          disabled={true}
          variant="standard"
          fullWidth
          placeholder="File Name Here..."
          multiline
          sx={{
            "& .MuiInputBase-root:before": {
              display: "none",
            },
            "& .MuiInputBase-root:after": {
              display: "none",
            },
          }}
        />
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"10px"} mt={1}>
        {actionIcons.map((data, index) => (
          <React.Fragment key={index}>
            <IconButton
              sx={{
                backgroundColor: "transparent",
                borderRadius: "30px",
                border: "1px solid #ccc",
                padding: "6px 15px",
                "&:hover": { backgroundColor: "#f1f2f2" },
              }}
              onClick={() => {
                if (data.action == "DELETE") {
                  deleteTrainingFile();
                } else if (data.action == "VIEW") {
                  viewTrainingFile();
                } else if (data.action == "SUMMARIZE") {
                  summarizeTrainingFile();
                } else if (data.action == "EMAIL") {
                  emailTrainingFile();
                }
              }}
            >
              {data.icon}
              <Typography
                variant="body1"
                component="h3"
                sx={{ fontSize: "16px", marginLeft: "5px" }}
              >
                {data.tooltip}
              </Typography>
            </IconButton>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ChatInputBox;
