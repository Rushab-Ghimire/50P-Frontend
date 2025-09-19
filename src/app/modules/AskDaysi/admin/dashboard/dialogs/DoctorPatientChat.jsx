import React, { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, useTheme } from "@mui/material";
import PatientBooking from "../components/PatientBooking";
import UserChat from "../components/PatientBooking/components/chat";
import { useQuery } from "react-query";
import { gqlQuery } from "@app/_utilities/http";
import { gql } from "graphql-request";
import DoctorDetailOnNotification from "../components/DoctorDetailOnNotification";
import PatientDetailOnNotification from "../components/PatientDetailOnNotification";

export const getBookingDetail = (id) => {
  return gql`
    query Query {
        patientBookingById(id: ${id}) {
            id
            providerUserId
            providerDefaultLang
            userDefaultLang
            user {
              id
              email
              firstName
              lastName
              phone
              profilePic
            }
            insuranceFileUuid
            reportFileUuid
            subscriptionNumber
            memberId
            insuranceProvider
            customNote
            bookingDateTime
            provider {
              address
              description
              insuranceAccepted {
                id
                name
              }
              languages {
                title
                id
              }
              name
              phone
              profilePic
              specialization {
                id
                title
                description
              }
              city {
                name
                id
              }
              educationTraining {
                id
                title
              }
            }
            status
        }
    }
`;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DoctorPatientChat = ({ bookingId, isDialogOpened, onDialogClosed }) => {
  const theme = useTheme();
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(isDialogOpened);
  const [bookingDetail, setBookingDetail] = useState({});

  //console.log("bookingI isDialogOpened", isDialogOpened);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["booking_by_id", { gql: getBookingDetail(bookingId) }],
    onSuccess: (dx) => {
      setBookingDetail((p) => dx);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: bookingId == -1 ? -1 : queryKey[1],
      }),
  });

  const dialogStylesChat = {
    "& .MuiDialog-container": {
      width: "95%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };

  const handleClose = () => {
    onDialogClosed();
    setOpen(false);
  };

  const chatDisplay = (ch) => {
    setRefresh(refresh + 1);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={dialogStylesChat}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            // inset: "5px 0 0 15px",
            left: "15px",
            top: "5px",
          }}
        >
          <CloseIcon />
        </IconButton>
        {Object.keys(bookingDetail).length > 0 && (
          <Grid container spacing={4} sx={{ padding: "40px 40px 0 40px" }}>
            <Grid item xs={12} md={4}>
              <DoctorDetailOnNotification bookingDetail={bookingDetail} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PatientDetailOnNotification bookingDetail={bookingDetail} />
            </Grid>
            <Grid item xs={12} md={4}>
              <UserChat bookingDetail={bookingDetail} />
            </Grid>
          </Grid>
        )}
      </Dialog>
    </>
  );
};

export default DoctorPatientChat;
