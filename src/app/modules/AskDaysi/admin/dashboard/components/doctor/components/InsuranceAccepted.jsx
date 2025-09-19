import React, { useEffect, useState } from "react";
import { DocListItemText } from "@app/modules/AskDaysi/styles/admin/doctor";
import { Box, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DoctorInsuranceAccepted = ({ contact }) => {
  const [refresh, setRefresh] = useState(0);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h2">Insurance Accepted</Typography>
      {contact.insurance_accepted.map((data, index) => (
        <ListItem sx={{ padding: "0 0 0 15px" }} key={index}>
          <ListItemAvatar sx={{ minWidth: "20px" }}>
            <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
          </ListItemAvatar>
          <DocListItemText primary={data.name} />
        </ListItem>
      ))}
    </Box>
  );
};

export default DoctorInsuranceAccepted;
