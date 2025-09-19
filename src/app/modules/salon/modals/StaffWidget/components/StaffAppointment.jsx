import React from "react";
import { JumboCard } from "@jumbo/components";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { CWNotification } from "@app/_styles/CustomerWidgets";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";

const appointmentList = [
  {
    id: 1,
    title: "Appointment 1",
    date: "01 December, 2024",
    time: "30 mins",
    type: "Hair Cut",
  },
  {
    id: 2,
    title: "Appointment 2",
    date: "14 December, 2024",
    time: "1hr 30 mins",
    type: "Hair Cut & Blow",
  },
  {
    id: 3,
    title: "Appointment 3",
    date: "22 December, 2024",
    time: "45 mins",
    type: "Beard Trim",
  },
];

const listStyle = {
  "& .MuiTypography-root": {
    fontSize: "15px",
  },
};
const StaffAppointment = ({ appointments }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          Appointments
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <EventAvailableOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      {appointments.map((data, index) => (
        <CWNotification key={index}>
          <Typography variant={"h4"} fontWeight={"500"}>
            {data.date}
          </Typography>
          <Typography>
            <List>
              {data.beauticians.map((itm) => (
                <ListItem sx={{ padding: 0 }}>
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Person4OutlinedIcon
                      sx={{
                        fontSize: "20px",
                        marginRight: "5px",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={itm} sx={listStyle} />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography>
            <List>
              {data.services.map((itm) => (
                <ListItem sx={{ padding: 0 }}>
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <EventAvailableOutlinedIcon
                      sx={{
                        fontSize: "20px",
                        marginRight: "5px",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={itm} sx={listStyle} />
                </ListItem>
              ))}
            </List>
          </Typography>
        </CWNotification>
      ))}
    </JumboCard>
  );
};

export default StaffAppointment;
