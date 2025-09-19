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
import { Dialog } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import QueueAppointmentSteps from "@app/modules/salon/queue/components/booking/components/QueueAppointmentSteps";
import { Box, Container, Stack } from "@mui/material";
import { BACloseIcon } from "@app/_styles/BookAppointment";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogStyle = {
  "& .MuiPaper-root": {
    overflowY: "visible",
    maxWidth: "800px",
  },
};

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

  const handleClickOpen = (queue) => {
    selectedQueue = queue;
    //console.log("queue", queue);
    setActiveStep((prevActiveStep) => 0);
    setOpen(true);
    setNewLoading(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //console.log("activeStep=====", activeStep);
    if (activeStep == 2) {
      handleClose();
      sweetAlerts("success", "New Booking Created !", Swal, theme);
      queryClient.invalidateQueries("queue");
      setRefresh(refresh + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (activeStep === 3) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  });

  const updateServiceStatus = useCallback(
    (booking_service_id, status, pos_id) => {
      mutate({
        inData: {
          gql: updateBookingServiceStatus(booking_service_id, status, pos_id),
        },
        path: `/graphql`,
      });
    }
  );

  const cancelBooking = useCallback((booking_id) => {
    console.log("canceling", booking_id);
    mutate({
      inData: {
        gql: cancelBookingDocument(booking_id),
      },
      path: `/graphql`,
    });
  });

  const {
    mutate,
    isPending,
    isError: isErrorStatus,
    error: errorStatus,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["booking_service_status"] });
      //success alert here
    },
  });

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
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
        <QueueAppointmentSteps
          steps={activeStep}
          nxtFxn={handleNext}
          closeFxn={handleClose}
          queue={selectedQueue}
        />
      </Dialog>
    </>
  );
};

export { QueueCalendar };
