import React, { useEffect, useState } from "react";
import { DocListItemText } from "@app/modules/AskDaysi/styles/admin/doctor";
import { Box, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ITEMS_KEY } from "@rjsf/utils";

var education = [];

const DoctorEducationTraining = ({ contact }) => {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    education = contact.education_training.map((item) => {
      return { title: item.title };
    });
    setRefresh(refresh + 1);
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h2">Education & Training</Typography>
      <List sx={{ p: 0 }}>
        {education.map((data, index) => (
          <ListItem sx={{ padding: "0 0 0 15px" }} key={index}>
            <ListItemAvatar sx={{ minWidth: "20px" }}>
              <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
            </ListItemAvatar>
            <DocListItemText primary={data.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DoctorEducationTraining;
