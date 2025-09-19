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
import { providerTimeslotCreateDocument, queryDocument } from "../../Documents";
import SessionFlow from "@app/modules/salon/modals/session";
import { Dialog, Tooltip } from "@mui/material";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TimeslotManager from "../../Form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
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
const QueueCalendar = ({ refreshV = 0 }) => {
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

  const refreshCalendar = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["ad_booking_service_status"],
      refetchType: "all",
    });
    setRefresh(refresh + 1);
  });

  const cellDecorator = useCallback((event) => {
    const backgroundColor = event.slot_count > 0 ? "#6dcff6" : "#FF6A70";
    return { style: { backgroundColor } };
  });

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["calendar", { gql: queryDocument(date) }],
  //   queryFn: ({ signal, queryKey }) =>
  //     gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  // });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ad_booking_service_status", { gql: queryDocument("", 0) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data) {
    let inData = data.data;

    events = [];
    inData.map((item) => {
      events.push({
        id: item.date,
        item: item,
        allDay: false,
        slot_count: item.slots.length,
        title:
          item.slots.length > 0
            ? `${item.slots.length} slot${item.slots.length <= 1 ? "" : "s"}`
            : "N/A",
        start: moment(item.date, "YYYY-MM-DD HH:mm").toDate(),
        end: moment(item.date, "YYYY-MM-DD HH:mm").toDate(),
      });
    });

    console.log("events", events);
  }

  //for session flow
  const [open, setOpen] = useState(false);
  const [timeslot, setTimeslot] = useState({});
  const initiateEdit = (e) => {
    setTimeslot((p) => e);
    setOpen(true);

    //console.log("1111");
    //providerTimeslotCreate("2025-03-05", "11", "45");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3;

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

  const dialogStyles = {
    "& .MuiDialog-container": {
      width: "30%",
      position: "absolute",
      right: 0,
      [theme.breakpoints.down("lg")]: {
        width: "50%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };

  return (
    <>
      <Calendar
        components={{
          eventWrapper: ({ event, children }) => (
            <div class="single-event" style={{ position: "relative" }}>
              <div
                class="event-buttons"
                style={{ position: "absolute", right: "5px", top: 0 }}
              >
                <ul
                  style={{ padding: 0, margin: 0, display: "flex", gap: "5px" }}
                >
                  <li
                    class="event-buttons-edit"
                    style={{ listStyle: "none", width: "max-content" }}
                  >
                    <Tooltip title="Manage Availability" placement="top" arrow>
                      <Button
                        onClick={() => {
                          initiateEdit(event);
                        }}
                        sx={{
                          padding: 0,
                          margin: 0,
                          minWidth: 0,
                        }}
                      >
                        <EditOutlinedIcon
                          sx={{
                            color: "#fff",
                            fontSize: "18px",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </li>
                </ul>
              </div>
              {children}
            </div>
          ),
        }}
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
          //handleClickOpen(slotInfo);
          //console.log(slotInfo);
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
        <TimeslotManager
          refreshCalendar={refreshCalendar}
          timeslot={timeslot}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
};

export { QueueCalendar };
