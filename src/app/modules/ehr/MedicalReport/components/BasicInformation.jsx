import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import { getFormattedDate } from "@app/_utilities/helpers";

var usersData = [
  {
    icon: <HealthAndSafetyOutlinedIcon />,
    key: "User ID",
    value: "456879",
  },
  {
    icon: <EmailOutlinedIcon />,
    key: "Email",
    value: "chris.hardy@example.com",
  },
  {
    icon: <AlternateEmailOutlinedIcon />,
    key: "Handle",
    value: "@ChrisHardy",
  },
  {
    icon: <LocalPhoneOutlinedIcon />,
    key: "Phone Number",
    value: "+1 999 (999) 9999",
  },
  {
    icon: <LocationOnOutlinedIcon />,
    key: "Address",
    value: "Bikaner, Rajasthan, India",
  },
  {
    icon: <LockOutlinedIcon />,
    key: "2-Step Authentication",
    value: "Not Setup Yet",
  },
  {
    icon: <PersonOutlineOutlinedIcon />,
    key: "User Since",
    value: "April, 2019",
  },
];
const BasicInformation = ({ ehrData }) => {
  usersData = [
    {
      icon: <HealthAndSafetyOutlinedIcon />,
      key: "Age",
      value: ehrData?.profile?.age,
    },
    {
      icon: <AlternateEmailOutlinedIcon />,
      key: "Preferred Doctor",
      value: ehrData?.profile?.preferred_doctor,
    },
    {
      icon: <LocalPhoneOutlinedIcon />,
      key: "Phone Number",
      value: ehrData?.profile?.phone,
    },
    {
      icon: <LocationOnOutlinedIcon />,
      key: "Address",
      value: ehrData?.profile?.address,
    },
    {
      icon: <AccessTimeOutlinedIcon />,
      key: "Booking Date & Time",
      value: getFormattedDate(ehrData?.profile?.booking_date_time),
    },
    {
      icon: <PersonOutlineOutlinedIcon />,
      key: "Gender",
      value: ehrData?.profile?.gender,
    },

    {
      icon: <MedicationOutlinedIcon />,
      key: "Treatment Type",
      value: ehrData?.profile?.treatment_type,
    },

    {
      icon: <MedicalInformationOutlinedIcon />,
      key: "Diagnostic Detail",
      value: ehrData?.profile?.diagnostic_detail,
    },
  ];

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        minWidth: 0,
        flexWrap: "wrap",
        color: "text.secondary",
        borderBottom: 1,
        borderColor: "divider",
        mb: 3.75,
        pb: 2,
        ".MuiListItem-root": {
          pl: 0,
          py: 0.5,
          width: { xs: "100%,", md: "50%" },
        },
        ".MuiListItemIcon-root": {
          color: "inherit",
          minWidth: 38,
        },
        ".MuiListItemText-root": {
          display: "flex",
          minWidth: 0,
        },
      }}
    >
      {usersData.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>{item?.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" width={"50%"}>
                {item?.key}
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary" width={"50%"}>
                {item?.value}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BasicInformation;
