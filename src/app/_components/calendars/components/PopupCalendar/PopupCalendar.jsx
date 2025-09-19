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
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import {
  queryDocument,
  updateBookingServiceStatus,
  cancelBookingDocument,
} from "./Document";
import SessionFlow from "@app/modules/salon/modals/session";
import { Button, Dialog, IconButton, Tooltip } from "@mui/material";
import { BACloseIcon } from "@app/_styles/BookAppointment";
import BookedServices from "@app/modules/salon/modals/session/components/BookedServices";
import ServicesTotal from "@app/modules/salon/modals/session/components/ServicesTotal";
import ServicesReceipt from "@app/modules/salon/modals/session/components/ServicesReceipt";
import ServiceComplete from "@app/modules/salon/modals/session/components/ServiceComplete";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slide from "@mui/material/Slide";
import { bookingDataset } from "@app/modules/booking/admin/components/Document";
import ReBookAppointment from "@app/modules/booking/admin/components/ReBookAppointment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { GLOBAL } from "@app/_utilities/globals";

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
var resource = [];

var reBook = false;
var reBookEvent = {};

const localizer = momentLocalizer(moment);

var bookingDataO = {};

var selectedBookingId = -1;
const PopupCalendar = ({ refreshV }) => {
  const [date, setDate] = React.useState(new Date());
  const [viewOption, setViewOption] = React.useState(Views.MONTH);
  const [newLoading, setNewLoading] = React.useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const [refresh, setRefresh] = React.useState(refreshV);

  if (refreshV != refresh) {
    setRefresh(refreshV);
    queryClient.invalidateQueries({
      queryKey: ["calendar"],
      refetchType: "all",
    });
  }

  const {
    data: bookingDataX,
    isLoading: isLoadingBooking,
    isError: isErrorBooking,
    error: errorBooking,
  } = useQuery({
    queryKey: [
      "dataset_booking",
      {
        gql: bookingDataset("booking_item", selectedBookingId),
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: newLoading && selectedBookingId != -1 ? queryKey[1] : -1,
        onSuccess: (bookingDataX) => {
          if (bookingDataX && newLoading && selectedBookingId != -1) {
            if (bookingDataX.rows) {
              bookingDataX = JSON.parse(bookingDataX.rows);
              bookingDataX.customer = JSON.parse(bookingDataX.customer);

              setNewLoading(false);
            }
          }

          GLOBAL.bookingData = bookingDataX;
          setRefresh(refresh + 1);
          setActiveStep((prevActiveStep) => 0);
          setOpen(true);
        },
      }),
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["calendar", { gql: queryDocument(date) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data) {
    let inData = JSON.parse(data.rows);

    events = inData.events.map((item) => {
      item.start = new Date(item.start);
      item.end = new Date(item.end);
    });

    events = inData.events;
    resource = inData.resource;
    //console.log(events, resource);
  }

  const handleClickOpen = (booking) => {
    setNewLoading(true);
    selectedBookingId = booking.id;
    queryClient.invalidateQueries({
      queryKey: ["dataset_booking"],
      refetchType: "all",
    });
  };

  const handleClose = () => {
    selectedBookingId = -1;
    setOpen(false);
  };

  const maxSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        onSuccess: (d) => {
          //setRefresh(refresh + 1);
        },
      });
    }
  );

  const cancelBooking = useCallback((booking_id) => {
    //console.log("canceling", booking_id);
    mutate({
      inData: {
        gql: cancelBookingDocument(booking_id),
      },
      path: `/graphql`,
      onSuccess: (result) => {
        setActiveStep((prevActiveStep) => 0);
        setOpen(false);
        setRefresh(refresh + 1);
      },
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

  const initiateEdit = useCallback((event) => {
    //console.log("editing...", event);
    reBookEvent = event;
    reBook = true;
    refreshFx();
  });

  const endEdit = useCallback(() => {
    reBookEvent = {};
    reBook = false;
    refreshFx();
  });

  const refreshFx = () => {
    setRefresh(refresh + 1);
  };

  return (
    <>
      {reBook && (
        <ReBookAppointment
          event={reBookEvent}
          endEdit={endEdit}
          refreshFx={refreshFx}
        />
      )}
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
                    <Tooltip title="Reschedule" placement="top" arrow>
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
                  <li
                    class="event-buttons-edit"
                    style={{ listStyle: "none", width: "max-content" }}
                  >
                    <Tooltip title="Manage" placement="top" arrow>
                      <Button
                        onClick={() => {
                          handleClickOpen(event);
                        }}
                        sx={{
                          padding: 0,
                          margin: 0,
                          minWidth: 0,
                        }}
                      >
                        <SettingsOutlinedIcon
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
        resources={resource}
        resourceAccessor={"resourceId"}
        resourceIdAccessor={"id"}
        resourceTitleAccessor={"name"}
        defaultDate={new Date()}
        style={{ height: 600 }}
        popup
        culture={"en"}
        view={viewOption}
        views={["month", "day"]}
        onView={(option) => setViewOption(option)}
        onNavigate={(newDate) => setDate(newDate)}
        date={date}
        onDoubleClickEvent={(slotInfo) => {
          handleClickOpen(slotInfo);
          //console.log(slotInfo);
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          selectedBookingId = -1;
        }}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        sx={dialogStyle}
      >
        {activeStep < 3 && (
          <BACloseIcon
            onClick={handleClose}
            sx={{ right: "-34px", top: "-34px" }}
          >
            <CancelOutlinedIcon sx={{ color: "#fff", fontSize: "32px" }} />
          </BACloseIcon>
        )}
        {activeStep === 0 && (
          <BookedServices
            updateServiceStatus={updateServiceStatus}
            bookingData={GLOBAL.bookingData}
            cancelBooking={cancelBooking}
            fxn={handleNext}
          />
        )}
        {activeStep === 1 && (
          <ServicesTotal bookingData={GLOBAL.bookingData} fxn={handleNext} />
        )}
        {activeStep === 2 && (
          <ServicesReceipt bookingData={GLOBAL.bookingData} fxn={handleNext} />
        )}
        {activeStep === 3 && <ServiceComplete />}
      </Dialog>
    </>
  );
};

export { PopupCalendar };
