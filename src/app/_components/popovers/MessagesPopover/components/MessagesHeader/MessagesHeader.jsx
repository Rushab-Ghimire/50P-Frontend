import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CardHeader, IconButton, Stack } from "@mui/material";

const MessagesHeader = ({ count, settingMenuCallback }) => {
  return (
    <CardHeader
      title={"Messages"}
      subheader={`${count} new message(s)`}
      action={
        <Stack direction="row" alignItems="center" sx={{ mr: 1 }}></Stack>
      }
      sx={{
        "& .MuiCardHeader-action": {
          alignSelf: "center",
        },
      }}
    />
  );
};

export { MessagesHeader };
