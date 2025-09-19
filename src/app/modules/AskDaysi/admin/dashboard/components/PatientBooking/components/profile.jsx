import React, { useCallback, useEffect, useState } from "react";
import {
  PAvatar,
  PBtnContainer,
  PDetail,
  PName,
} from "@app/modules/AskDaysi/styles/admin/patient";
import {
  Alert,
  Box,
  Button,
  Stack,
  ToggleButton,
  Typography,
  ToggleButtonGroup,
} from "@mui/material";
import pAvaar from "/assets/images/avatar/avatar5.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import ConfirmationDialog from "../../../dialogs/confirmation";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { gqlMutate } from "@app/_utilities/http";
import { useMutation } from "react-query";
import {
  moveToQueue,
  reschedulePatientBooking,
  updateBookingStatus,
} from "./Document";
import { InsuranceChecker } from "../../InsuranceChecker";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DocFormLabel } from "@app/modules/AskDaysi/styles/admin/doctor";
import { CircularProgressLoader } from "@app/_styles/ModuleModal";
import moment from "moment";
import { getFormattedDate } from "@app/_utilities/helpers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { getProviderTimeSlotsByDateDocument } from "../../../pages/Timeslots/Documents";
import { JumboCard } from "@jumbo/components";

const iconStyles = {
  position: "relative",
  top: "5px",
  fontSize: "22px",
  marginRight: "5px",
};

var timeSet = [];

const formStyle = {
  marginTop: "20px",
};

const ButtonStyles = {
  width: "90px",
  border: "1px solid #ccc !important",
  padding: "6px 12px",
  fontWeight: "400",
  borderRadius: "8px !important",
};

const toggleStyle = {
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "10px",
  width: "100%",
  "& .Mui-selected": {
    border: "1px solid #6dcff6 !important",
    borderRadius: "8px",
    backgroundColor: "#6dcff6 !important",
    color: "#fff !important",
  },
};

const PatientsProfile = ({
  bookingDetail,
  handleClose,
  fromQueue = false,
  queueId,
}) => {
  const [isNoShow, setIsNoShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isQueued, setIsQueued] = useState(false);
  const [isRescheduled, setIsRescheduled] = useState(false);
  const [status, setStatus] = useState(
    bookingDetail.status === undefined ? "NEW" : bookingDetail.status
  );

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleReschedule = () => {
    if (time.trim() == "") {
      setFormError({ isError: true, message: "Select Time" });
      return;
    }

    var datePart = getFormattedDate(queueDateTime, "YYYY-MM-DD");
    datePart = datePart + " " + time;
    var bookDTime = moment(datePart).toDate();
    //console.log("bookDTime", bookDTime);

    mutate({
      inData: { gql: reschedulePatientBooking(queueId, bookDTime) },
      path: "/graphql",
      onSuccess: (dx) => {
        //setStatus(dx.updateAdBookingStatus?.status);
      },
    });
    setIsRescheduled(!isRescheduled);
  };

  const handleQueue = () => {
    mutate({
      inData: { gql: updateBookingStatus(bookingDetail.id, "queued") },
      path: "/graphql",
      onSuccess: (dx) => {
        setStatus(dx.updateAdBookingStatus?.status);
      },
    });

    mutate({
      inData: { gql: moveToQueue(bookingDetail.id) },
      path: "/graphql",
      onSuccess: (dx) => {},
    });

    setIsQueued(!isQueued);
  };

  const handleNoShow = () => {
    mutate({
      inData: { gql: updateBookingStatus(bookingDetail.id, "NO_SHOW") },
      path: "/graphql",
      onSuccess: (dx) => {
        setStatus(dx.updateAdBookingStatus?.status);
      },
    });
    setIsNoShow(!isNoShow);
  };

  const handleSuccess = () => {
    mutate({
      inData: { gql: updateBookingStatus(bookingDetail.id, "CONFIRMED") },
      path: "/graphql",
      onSuccess: (dx) => {
        setStatus(dx.updateAdBookingStatus?.status);
      },
    });
    setIsSuccess(!isSuccess);
  };

  const handleCancel = () => {
    mutate({
      inData: { gql: updateBookingStatus(bookingDetail.id, "CANCELLED") },
      path: "/graphql",
      onSuccess: (dx) => {
        setStatus(dx.updateAdBookingStatus?.status);
      },
    });
    setIsCancelled(!isCancelled);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  const [time, setTime] = useState();

  const handleTime = (event, newTime) => {
    setTime(newTime);
  };

  const [queueDateTime, setQueueDateTime] = useState(new Date());

  const [loadingTimeslots, setLoadingTimeslots] = useState(false);
  useEffect(() => {
    renderTimeSlots();
  }, []);

  const renderTimeSlots = useCallback((d) => {
    setTime("");
    setFormError({ isError: false, message: "" });
    if (d === undefined) {
      d = new Date();
    }
    setLoadingTimeslots(true);
    mutate({
      inData: {
        gql: getProviderTimeSlotsByDateDocument(d),
      },
      path: `/graphql`,
      onSuccess: (dx) => {
        setLoadingTimeslots(false);
        timeSet = [];
        if (dx.getProviderTimeSlotsByDate.data[0] === undefined) {
          return;
        }
        dx.getProviderTimeSlotsByDate.data[0].slots.map((i) => {
          timeSet.push({
            id: i.id,
            slot: i.slot,
            time: getFormattedDate(
              moment(i.fullDateTime, "YYYY-MM-DD HH:mm").toDate(),
              "hh:mm a"
            ),
          });
        });

        setLoadingTimeslots(false);
      },
    });
  });

  return (
    <>
      <Box>
        <Stack>
          <PAvatar
            src={
              bookingDetail.userProfilePic !== undefined
                ? bookingDetail.userProfilePic
                : bookingDetail.user.profilePic
            }
            alt="Patient Photo"
          />
          <PName>
            {bookingDetail.user?.firstName} {bookingDetail.user?.lastName}
          </PName>
          <PDetail>
            <EmailOutlinedIcon sx={iconStyles} />
            {bookingDetail.user?.email}
          </PDetail>
          <PDetail>
            <SmartphoneOutlinedIcon sx={iconStyles} />
            {bookingDetail.user?.phone ? bookingDetail.user?.phone : "-"}
          </PDetail>
          <PDetail>
            <RoomOutlinedIcon sx={iconStyles} />
            {status}
          </PDetail>
        </Stack>
      </Box>
      {(bookingDetail.status == "new" ||
        bookingDetail.status == "confirmed") && (
        <PBtnContainer>
          <Button variant="contained" onClick={() => handleSuccess()}>
            Confirm
          </Button>
          <Button
            color="warning"
            // sx={{ backgroundColor: "#f5d177" }}
            variant="contained"
            onClick={() => handleNoShow()}
          >
            No-Show
          </Button>
          <Button
            color="error"
            // sx={{ backgroundColor: "#f6abb6", color: "white" }}
            variant="contained"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </PBtnContainer>
      )}

      {(bookingDetail.status == "no_show" ||
        bookingDetail.status == "cancelled") && (
        <PBtnContainer>
          <Button variant="contained" onClick={() => handleQueue()}>
            Move to Queue
          </Button>
        </PBtnContainer>
      )}

      {fromQueue && (
        <JumboCard contentWrapper sx={{ mt: 2.5 }}>
          <Box sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  defaultValue={dayjs(queueDateTime)}
                  onChange={(date) => {
                    setQueueDateTime((d) => new Date(date));
                    renderTimeSlots(new Date(date));
                  }}
                  label="Select Date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={formStyle}>
            <DocFormLabel sx={{ mb: 1 }}>Select Time</DocFormLabel>
            {loadingTimeslots && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CircularProgressLoader />
                <Typography variant="h4">
                  Loading Available Timeslots
                </Typography>
              </Box>
            )}
            {!loadingTimeslots && timeSet.length <= 0 && (
              <Alert severity="error">
                <Typography variant="h4">
                  No Timeslots Available for this Date.
                </Typography>
              </Alert>
            )}
            {!loadingTimeslots && timeSet.length > 0 && (
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                sx={toggleStyle}
              >
                {timeSet.map((data, index) => (
                  <ToggleButton key={index} value={data.slot} sx={ButtonStyles}>
                    {data.time}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Box>
          {formError.isError && (
            <Alert sx={{ marginBottom: "10px" }} severity="error">
              {formError.message}
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={() => handleReschedule()}
            sx={{ mt: 3, width: "100%" }}
          >
            Reschedule
          </Button>
        </JumboCard>
      )}

      <InsuranceChecker
        default={{
          subscription_number: bookingDetail.subscriptionNumber,
          member_id: bookingDetail.memberId,
          insurance_provider: bookingDetail.insuranceProvider,
        }}
      />
      <ConfirmationDialog
        isDialogOpened={isSuccess}
        handleCloseDialog={() => setIsSuccess(false)}
        icon={<CheckCircleOutlineOutlinedIcon />}
        title="Success"
        description="Booking Confirmed Successfully!"
        iconColor="#3BD2A2"
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsSuccess(false);
            handleClose();
          }}
        >
          Ok
        </Button>
      </ConfirmationDialog>
      <ConfirmationDialog
        isDialogOpened={isCancelled}
        handleCloseDialog={() => setIsCancelled(false)}
        icon={<CancelOutlinedIcon />}
        title="Cancelled"
        description="Booking Cancelled!"
        iconColor="#FF6A70"
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsSuccess(false);
            handleClose();
          }}
        >
          Ok
        </Button>
      </ConfirmationDialog>
      <ConfirmationDialog
        isDialogOpened={isNoShow}
        handleCloseDialog={() => setIsNoShow(false)}
        icon={<CancelOutlinedIcon />}
        title="No-Show"
        description="Booking marked as No Show!"
        iconColor="#FF6A70"
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsNoShow(false);
            handleClose();
          }}
        >
          Ok
        </Button>
      </ConfirmationDialog>
      <ConfirmationDialog
        isDialogOpened={isQueued}
        handleCloseDialog={() => setIsQueued(false)}
        icon={<CancelOutlinedIcon />}
        title="Queued for Rescheduling"
        description="Booking has been moved to Queue for Rescheduling!"
        iconColor="#FF6A70"
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsQueued(false);
            handleClose();
          }}
        >
          Ok
        </Button>
      </ConfirmationDialog>
      <ConfirmationDialog
        isDialogOpened={isRescheduled}
        handleCloseDialog={() => setIsRescheduled(false)}
        icon={<CancelOutlinedIcon />}
        title="Rescheduled"
        description="Booking has been rescheduled for new Appointment"
        iconColor="#FF6A70"
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsRescheduled(false);
            handleClose();
          }}
        >
          Ok
        </Button>
      </ConfirmationDialog>
    </>
  );
};

export default PatientsProfile;
