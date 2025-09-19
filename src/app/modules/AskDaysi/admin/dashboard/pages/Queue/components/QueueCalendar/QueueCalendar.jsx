import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery, useMutation } from "react-query";
import {
  queryClient,
  gqlQuery,
  gqlMutate,
  subscribeToEvent,
} from "@app/_utilities/http.js";
import { queryDocument } from "../../Documents";
import SessionFlow from "@app/modules/salon/modals/session";
import { Dialog, Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import QueueAppointmentSteps from "@app/modules/salon/queue/components/booking/components/QueueAppointmentSteps";
import { Box, Container, Stack } from "@mui/material";
import { BABtn, BACloseIcon } from "@app/_styles/BookAppointment";
import BookedServices from "@app/modules/salon/modals/session/components/BookedServices";
import ServicesTotal from "@app/modules/salon/modals/session/components/ServicesTotal";
import ServicesReceipt from "@app/modules/salon/modals/session/components/ServicesReceipt";
import ServiceComplete from "@app/modules/salon/modals/session/components/ServiceComplete";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slide from "@mui/material/Slide";
import { bookingDataset } from "@app/modules/booking/admin/components/Document";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { sweetAlerts } from "@app/_utilities/http.js";
import { useTheme } from "@mui/material/styles";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { bookingFromQueueDocument } from "./Document";
import { LoadingButton } from "@mui/lab";
import { JumboCard } from "@jumbo/components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import PatientBookingDetails from "../../../../dialogs/PatientBookingDetails";
import { getFormattedDate } from "@app/_utilities/helpers";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

var events = [];

const localizer = momentLocalizer(moment);

var bookingData = {};

var selectedQueue = -1;
const QueueCalendar = ({ refreshV }) => {
  const [date, setDate] = React.useState(new Date());
  const [viewOption, setViewOption] = React.useState(Views.MONTH);
  const [newLoading, setNewLoading] = React.useState(true);
  const Swal = useSwalWrapper();
  const theme = useTheme();

  React.useEffect(() => {
    subscribeToEvent("NEW_NOTIFICATION", newQueueEvent);
  }, []);

  const newQueueEvent = React.useCallback((dataIn) => {
    //console.log("new dataIn", dataIn);
    queryClient.invalidateQueries("queue");
    setRefresh(refresh + 1);
  });

  const [refresh, setRefresh] = React.useState(refreshV);
  if (refreshV != refresh) {
    setRefresh(refreshV);
    queryClient.invalidateQueries({
      queryKey: ["calendar"],
      refetchType: "all",
    });
  }

  const cellDecorator = useCallback((event) => {
    const backgroundColor =
      event.booking?.id !== undefined ? "#6dcff6" : "#FF6A70";
    return { style: { backgroundColor } };
  });

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["calendar", { gql: queryDocument(date) }],
  //   queryFn: ({ signal, queryKey }) =>
  //     gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  // });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["queue", { gql: queryDocument("", 0) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data) {
    let inData = data.rows;

    events = inData.map((item) => {
      return {
        id: item.id,
        allDay: false,
        booking: item.booking,
        title: `${item.customer.firstName} ${item.customer.lastName == undefined ? "" : item.customer.lastName}`,
        start: new Date(item.queueDateTime),
        end: new Date(item.queueDateTime),
        customer: item.customer,
        note: item.note,
      };
    });
  }

  //for session flow
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (queue) => {
    selectedQueue = queue;
    //console.log("queue", queue);
    if (selectedQueue.booking != null) {
      setBookingDetail((p) => selectedQueue.booking);
      setIsOpenBD(true);
    } else {
      //setActiveStep((prevActiveStep) => 0);
      setOpen(true);
      //setNewLoading(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3;

  const {
    mutate,
    isPending,
    isError: isErrorStatus,
    error: errorStatus,
  } = useMutation({
    mutationFn: gqlMutate,
  });

  const moveQueueToBooking = React.useCallback(() => {
    setLoading(true);
    mutate({
      inData: { gql: bookingFromQueueDocument(selectedQueue.id) },
      path: `/graphql`,
      onSuccess: (e) => {
        queryClient.invalidateQueries({ queryKey: ["queue"] });
        setRefresh(refresh + 1);
        setLoading(false);
        handleClose();
      },
    });
  });

  const dialogStyles = {
    "& .MuiDialog-container": {
      width: "30%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "75%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };

  const iconStyle = { position: "relative", top: "4px" };

  const [isOpenBD, setIsOpenBD] = useState(false);
  const [bookingDetail, setBookingDetail] = useState();

  const handleOpenBD = () => {
    setIsOpenBD(!isOpenBD);
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        defaultDate={new Date()}
        style={{ height: 600 }}
        popup
        culture={"en"}
        view={viewOption}
        views={["month"]}
        onView={(option) => setViewOption(option)}
        onNavigate={(newDate) => setDate(newDate)}
        date={date}
        eventPropGetter={cellDecorator}
        onDoubleClickEvent={(slotInfo) => {
          handleClickOpen(slotInfo);

          //console.log(slotInfo);
        }}
      />

      <PatientBookingDetails
        fromQueue={true}
        queueId={selectedQueue.id}
        bookingDetail={bookingDetail}
        isDialogOpened={isOpenBD}
        handleCloseDialog={() => {
          setIsOpenBD(false);
          //ref.current.reloadCalendar();
        }}
      />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={dialogStyles}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <Stack>
              {activeStep > 0 && (
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              )}
            </Stack>
            <Stack>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
        </Container>
        <JumboCard contentWrapper sx={{ margin: "0 30px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-center",
              gap: "3px",
            }}
          >
            <Stack>
              <Typography
                variant="h3"
                sx={{ fontWeight: 500, fontSize: "24px" }}
              >
                {selectedQueue?.customer?.firstName}{" "}
                {selectedQueue?.customer?.lastName}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h4" sx={{ fontSize: "18px" }}>
                <EmailOutlinedIcon fontSize="small" sx={iconStyle} />{" "}
                {selectedQueue?.customer?.email}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h4" sx={{ fontSize: "18px" }}>
                <SmartphoneOutlinedIcon fontSize="small" sx={iconStyle} />{" "}
                {selectedQueue?.customer?.phone === undefined ||
                selectedQueue?.customer?.phone == ""
                  ? "-"
                  : selectedQueue?.customer?.phone}
              </Typography>
            </Stack>
            <Divider sx={{ pt: 1, mb: 1 }} />
            <Stack>
              <Typography
                variant="h3"
                sx={{ fontSize: "20px", fontWeight: "500" }}
              >
                Appointment For
              </Typography>
              <Typography variant="h4" sx={{ fontSize: "18px" }}>
                <EventOutlinedIcon fontSize="small" sx={iconStyle} />{" "}
                {getFormattedDate(selectedQueue?.start)}
              </Typography>
            </Stack>
            <Divider sx={{ pt: 1, mb: 1 }} />
            <Stack>
              <Typography
                variant="h3"
                sx={{ fontSize: "20px", fontWeight: "500" }}
              >
                Note
              </Typography>
              <Typography variant="h4" sx={{ fontSize: "18px" }}>
                {selectedQueue?.note}
              </Typography>
            </Stack>

            <Stack>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                onClick={moveQueueToBooking}
                sx={{ marginTop: "15px" }}
              >
                Book Now
              </LoadingButton>
            </Stack>
          </Box>
        </JumboCard>
      </Dialog>
    </>
  );
};

export { QueueCalendar };
