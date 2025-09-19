import React from "react";
import { JumboCard } from "@jumbo/components";
import { Stack, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const NoteWidget = ({ title, note }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          {title}
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <EditNoteOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      <Typography variant={"h5"}>{note}</Typography>
    </JumboCard>
  );
};

export default NoteWidget;
