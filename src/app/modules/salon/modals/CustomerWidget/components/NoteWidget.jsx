import React, { Fragment } from "react";
import { JumboCard } from "@jumbo/components";
import { Stack, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Key } from "@mui/icons-material";

const NoteWidget = ({ title, notes }) => {
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
      {notes.map((item) => (
        <Fragment key={item.id}>
          <Typography variant={"h5"}>from : {item.from}</Typography>
          <Typography variant={"h5"}>{item.note}</Typography>
          <hr />
        </Fragment>
      ))}
    </JumboCard>
  );
};

export default NoteWidget;
