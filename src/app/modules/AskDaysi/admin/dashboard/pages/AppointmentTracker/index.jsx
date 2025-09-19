import React, { useRef, useState } from "react";
import { PopupCalendar } from "../../components/calendars/PopupCalendar";
import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import PatientBookingDetails from "../../dialogs/PatientBookingDetails";
import { useSearchParams } from "react-router-dom";
import LocationSelector from "../../components/FormComponents/LocationSelector";

const AppointmentTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingDetail, setBookingDetail] = useState();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const showBookingDetail = (booking) => {
    setBookingDetail((p) => booking);
    setIsOpen(true);
    //console.log("sssss bookingDetail", bookingDetail);
  };

  const theme = useTheme();

  const ref = useRef(null);

  return (
    <>
      <CalendarWrapper>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              gap: "10px",
            },
          }}
        >
          <Stack>
            <Typography variant="h3">No-Show & Cancellations</Typography>
          </Stack>
          <Stack sx={{ flexDirection: "row" }}>
            <div
              style={{
                backgroundColor: "#f5d177",
                padding: "3px 15px",
                color: "#fff",
                borderRadius: "4px 0 0 4px",
              }}
            >
              No-Show
            </div>
            <div
              style={{
                backgroundColor: "#f6abb6",
                padding: "3px 15px",
                color: "#fff",
                borderRadius: "0 4px 4px 0",
              }}
            >
              Cancelled
            </div>
          </Stack>
        </Box>
        <Box>
          <LocationSelector labelTitle="Clinic Location" marginBottom="20px" />
        </Box>
        <PatientBookingDetails
          bookingDetail={bookingDetail}
          isDialogOpened={isOpen}
          handleCloseDialog={() => {
            setIsOpen(false);
            ref.current.reloadCalendar();
          }}
        />
        <PopupCalendar
          status="cancelled,no_show"
          ref={ref}
          showBookingDetail={showBookingDetail}
        />
      </CalendarWrapper>
    </>
  );
};

export default AppointmentTracker;
