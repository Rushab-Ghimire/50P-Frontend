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
import MyBookingForm from "./BookingForm";

const progressStyle = {
  height: "24px !important",
  width: "24px !important",
};

var details = [];

const MyProfile = ({ bookingDetail }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedReview, setIsClickedReview] = useState(false);
  const [refresh, setRefresh] = useState(0);

  //console.log("zzzz", bookingDetail);

  useEffect(() => {
    details = [
      {
        title: "Name:",
        description: bookingDetail.provider.name,
      },
      {
        title: "Specialty:",
        description: bookingDetail.provider.specialization
          .map((item) => item.title)
          .join(", "),
      },
      {
        title: "Languages:",
        description: bookingDetail.provider.languages
          .map((item) => item.title)
          .join(", "),
      },
      {
        title: "Location:",
        description: [
          bookingDetail.provider.address,
          bookingDetail.provider.city.name,
          bookingDetail.provider.state.name,
        ].join(", "),
      },
      {
        title: "Booking Status:",
        description: bookingDetail.status,
      },
    ];
    setRefresh(refresh + 1);
  }, []);

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
          <DocPicture src={bookingDetail.provider.profilePic} alt="Doctor" />
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
            {isClickedReview ? (
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
            )}
          </DocBtnContainer>
        </Stack>
      </DocContainer>
      <Box>
        <MyBookingForm bookingDetail={bookingDetail} />
      </Box>
    </>
  );
};

export default MyProfile;
