import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";
import React, { forwardRef, useImperativeHandle } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarData } from "../data";
import { useQuery } from "react-query";
import { getBookingAD } from "./Document";
import { gqlQuery, queryClient } from "@app/_utilities/http";
import { useSearchParams } from "react-router-dom";

const localizer = momentLocalizer(moment);

var events = [];

const PopupCalendar = forwardRef((props, ref) => {
  const [date, setDate] = React.useState(new Date());
  const [viewOption, setViewOption] = React.useState(Views.MONTH);
  const [searchParams, setSearchParams] = useSearchParams();
  const [refresh, setRefresh] = React.useState(0);

  useImperativeHandle(ref, () => ({
    reloadCalendar: () => {
      queryClient.invalidateQueries({
        queryKey: ["ad_calendar"],
        refetchType: "all",
      });
      setRefresh((r) => r + 1);
    },
  }));

  const { dataX, isLoading, isError, error } = useQuery({
    onSuccess: (data) => {
      if (data) {
        let inData = data.rows;
        events = [];
        events = inData.map((item) => {
          return {
            title: item.user?.firstName,
            allDay: false,
            start: new Date(item.bookingDateTime),
            end: new Date(item.bookingDateTime),
            booking: item,
          };
        });
        //console.log("events xxxx", events);
        if (searchParams.get("bid") !== -1) {
          setTimeout(() => {
            var selE = events.filter(
              (item) => item.booking.id == Number(searchParams.get("bid"))
            );
            if (selE[0] !== undefined) {
              handleClickOpen(selE[0]);
            }

            searchParams.set("bid", -1);
          }, 1000);
        }
      }
    },
    queryKey: [
      "ad_calendar",
      { gql: getBookingAD(date, (status = props.status)) },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  const handleClickOpen = (b) => {
    props.showBookingDetail(b.booking);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      step={30}
      defaultDate={new Date()}
      style={{ height: 600 }}
      popup
      culture={"en"}
      views={["month", "day"]}
      view={viewOption}
      onView={(option) => setViewOption(option)}
      onNavigate={(newDate) => setDate(newDate)}
      date={date}
      eventPropGetter={(event) => {
        var backgroundColor = "";
        if (event.booking.status == "no_show") {
          backgroundColor = "#f5d177";
        } else if (event.booking.status == "cancelled") {
          backgroundColor = "#f6abb6";
        } else if (event.booking.status == "confirmed") {
          backgroundColor = "#65c3ba";
        } else {
          backgroundColor = "#84c1ff";
        }
        return {
          style: { backgroundColor },
        };
      }}
      onDoubleClickEvent={(slotInfo) => {
        handleClickOpen(slotInfo);
      }}
    />
  );
});

export { PopupCalendar };
