import React, { useEffect, useState } from "react";
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
import PatientBookingForm from "./PatientBookingForm";
import { getCookie } from "@jumbo/utilities/cookies";

var details = [];

const progressStyle = {
  height: "24px !important",
  width: "24px !important",
};

const DoctorProfile = ({ contact, openBookingForm }) => {
  const [isClicked, setIsClicked] = useState(
    openBookingForm ? openBookingForm : false
  );
  const [isClickedReview, setIsClickedReview] = useState(false);
  const [isBooking, setIsBooking] = useState(
    openBookingForm
      ? openBookingForm
      : getCookie("doctorSearchSelContactOpenBooking") == contact.id
        ? true
        : false
  );
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    //console.log("contact", contact);
    details = [
      {
        title: "Name:",
        description: contact.name,
      },
      {
        title: "Specialty:",
        description: contact.speciality,
      },
      {
        title: "Languages",
        description: contact.languages.map((item) => item.title).join(", "),
      },
      {
        title: "Location",
        description: contact.address,
      },
    ];
    setRefresh(refresh + 1);
  }, []);

  const handleClick = () => {
    setIsBooking(true);
    setIsClicked(true);
    // setTimeout(() => {
    //   setIsClicked(false);
    // }, 3000);
  };

  const handleHideClick = () => {
    setIsBooking(false);
    setIsClicked(false);
  };

  const handleClickReview = () => {
    setIsClickedReview(true);
    setTimeout(() => {
      setIsClickedReview(false);
    }, 3000);
  };
  return (
    <>
      <DocContainer>
        <Stack>
          <DocPicture src={contact.profile_pic} alt="Doctor" />
        </Stack>
        <Stack>
          {details.map((data, index) => (
            <Typography variant="h3" key={index}>
              <Typography variant="span" fontWeight={"500"} sx={{ mr: 1 }}>
                {data.title}
              </Typography>
              {data.description}
            </Typography>
          ))}

          <DocBtnContainer>
            {isClicked ? (
              <Button
                variant="contained"
                startIcon={<CalendarMonthOutlinedIcon />}
                onClick={handleHideClick}
              >
                Hide Book Appointment
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<CalendarMonthOutlinedIcon />}
                onClick={handleClick}
              >
                Book Appointment
              </Button>
            )}

            {/* {isClickedReview ? (
              <Button>
                <CircularProgress sx={progressStyle} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<ReviewsOutlinedIcon />}
                onClick={handleClickReview}
              >
                Leave a Review
              </Button>
            )} */}
          </DocBtnContainer>
        </Stack>
      </DocContainer>
      <Box>
        {isBooking && (
          <PatientBookingForm mode={contact.mode} providerId={contact.id} />
        )}
      </Box>
    </>
  );
};

export default DoctorProfile;
