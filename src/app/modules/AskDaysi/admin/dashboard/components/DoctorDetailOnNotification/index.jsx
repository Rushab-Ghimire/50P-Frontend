import React from "react";
import {
  DocBtnContainer,
  DocContainer,
  DocPicture,
} from "@app/modules/AskDaysi/styles/admin/doctor";
import { Box, Button, Stack, Typography } from "@mui/material";
import docPhoto from "/assets/images/avatar/avatar7.jpg";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import { DocListItemText } from "@app/modules/AskDaysi/styles/admin/doctor";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  PAvatar,
  PDetail,
  PName,
} from "@app/modules/AskDaysi/styles/admin/patient";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { InsuranceChecker } from "../InsuranceChecker";

const education = [
  {
    id: 1,
    title: "MD - Columbia Medical School",
  },
  {
    id: 2,
    title: "Residency - Mayo Clinic",
  },
];

const insurance = [
  {
    id: 1,
    title: "Cigna",
  },
  {
    id: 2,
    title: "Aetna",
  },
  {
    id: 3,
    title: "Medicare",
  },
];
const iconStyles = {
  position: "relative",
  top: "5px",
  fontSize: "22px",
  marginRight: "5px",
};
const DoctorDetailOnNotification = ({ bookingDetail }) => {
  return (
    <>
      <Box sx={{ xmarginBottom: "25px" }}>
        <Stack>
          <PAvatar
            src={bookingDetail.provider?.profilePic}
            alt="Patient Photo"
          />
          <PName>{bookingDetail.provider?.name}</PName>
          <PDetail>
            <StarRateOutlinedIcon sx={iconStyles} />
            {bookingDetail.provider?.specialization
              .map((i) => i.title)
              .join(", ")}
          </PDetail>
          <PDetail>
            <LanguageOutlinedIcon sx={iconStyles} />
            {bookingDetail.provider?.languages.map((i) => i.title).join(", ")}
          </PDetail>

          <PDetail>
            <RoomOutlinedIcon sx={iconStyles} />
            {bookingDetail.provider?.address} ,{" "}
            {bookingDetail.provider?.city?.name}
          </PDetail>
        </Stack>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h3" fontWeight={"500"}>
          About
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "18px" }}>
          {bookingDetail.provider?.description}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h3" fontWeight={"500"}>
          Education & Training
        </Typography>
        <List sx={{ p: 0 }}>
          {bookingDetail.provider?.educationTraining.map((data, index) => (
            <ListItem sx={{ padding: "0 0 0 15px" }} key={index}>
              <ListItemAvatar sx={{ minWidth: "20px" }}>
                <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
              </ListItemAvatar>
              <DocListItemText primary={data.title} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h3" fontWeight={"500"}>
          Insurance Accepted
        </Typography>
        {bookingDetail.provider?.insuranceAccepted.map((data, index) => (
          <ListItem sx={{ padding: "0 0 0 15px" }} key={index}>
            <ListItemAvatar sx={{ minWidth: "20px" }}>
              <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
            </ListItemAvatar>
            <DocListItemText primary={data.name} />
          </ListItem>
        ))}
      </Box>
      <Box sx={{ mt: 3 }}>
        <InsuranceChecker
          default={{
            subscription_number: bookingDetail.subscriptionNumber,
            member_id: bookingDetail.memberId,
            insurance_provider: bookingDetail.insuranceProvider,
          }}
          is_multiple={false}
        />
      </Box>
    </>
  );
};

export default DoctorDetailOnNotification;
