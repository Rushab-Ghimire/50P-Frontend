import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import PatientsProfile from "./components/profile";
import DoctorsNote from "./components/note";
import PatientsBookingDateTime from "./components/booking";
import PatientsInsurance from "./components/insurance";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import UserChat from "./components/chat";

const PatientBooking = ({
  chatDisplay,
  bookingDetail,
  handleClose,
  fromQueue = false,
  queueId,
}) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Grid container spacing={4} sx={{ padding: "40px 40px 0 40px" }}>
        <Grid item xs={12} md={showChat ? 3 : 6}>
          <PatientsProfile
            queueId={queueId}
            fromQueue={fromQueue}
            handleClose={handleClose}
            bookingDetail={bookingDetail}
          />
        </Grid>
        <Grid item xs={12} md={showChat ? 3 : 6}>
          <Button
            sx={{
              width: "100%",
            }}
            variant={showChat ? "contained" : "contained"}
            size="large"
            onClick={() => {
              var v_showChat = !showChat;
              setShowChat(v_showChat);
              chatDisplay(v_showChat);
            }}
          >
            {showChat ? (
              "Close Chat"
            ) : (
              <>
                Chat With Patient <MapsUgcOutlinedIcon sx={{ ml: 0.5 }} />
              </>
            )}
          </Button>
          {/* // for bigger  screens */}
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              marginTop: "25px",
            }}
          >
            <PatientsBookingDateTime bookingDetail={bookingDetail} />
            <PatientsInsurance bookingDetail={bookingDetail} />
            <DoctorsNote
              title="Note from Patient"
              bookingDetail={bookingDetail}
            />
          </Box>
        </Grid>
        {showChat && (
          <Grid item xs={12} md={showChat ? 6 : 6}>
            <UserChat bookingDetail={bookingDetail} />
          </Grid>
        )}
        {/* // for smaller screens */}
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            width: "100%",
            paddingLeft: "30px",
            marginTop: "25px",
          }}
        >
          <PatientsBookingDateTime bookingDetail={bookingDetail} />
          <PatientsInsurance bookingDetail={bookingDetail} />
          <DoctorsNote
            bookingDetail={bookingDetail}
            title="Note from Patient"
          />
        </Box>
      </Grid>
    </>
  );
};

export default PatientBooking;
