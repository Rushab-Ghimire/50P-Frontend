import React from "react";
import { JumboCard } from "@jumbo/components";
import { Stack, TextField, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const textField = {
  "& .Mui-disabled": {
    color: "#37373C",
    WebkitTextFillColor: "#37373C",
  },
};
const DoctorsNote = ({ title, bookingDetail }) => {
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
      <TextField
        disabled={true}
        placeholder={title}
        value={bookingDetail.customNote}
        multiline
        rows={8}
        sx={textField}
      />
    </JumboCard>
  );
};

export default DoctorsNote;
