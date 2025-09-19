import { Container, Grid } from "@mui/material";
import React from "react";
import SelectedServices from "./SelectedServices";
import SelectServices from "./SelectServices";
import SelectProfessional from "./SelectProfessional";
import SelectTime from "./SelectTime";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import {
  bookingDataset,
  bookingDocument,
  updateDocument,
  singleBookingDataset,
} from "./Document";
import ReBookSelectServices from "./ReBookSelectServices";
import ReBookSelectProfessional from "./ReBookSelectProfessional";
import ReBookSelectedServices from "./ReBookSelectedServices";
import ReBookSelectTime from "./ReBookSelectTime";

var services = [];
var resources = [];
var organization = {};
var bookingDetail = {};

// var _selected_services = [
//   {
//     id: 52,
//     title: "Haircut",
//     time: "1 hr 30 mins",
//     price: 100,
//     price_display: "USD 100.0",
//   },
// ];
// var _selected_beautician = [
//   {
//     id: 79,
//     name: "David",
//   },
// ];
// var _selected_date_time = new Date();

var singleBookingData = {
  selected_services: [],
};

const ReBookAppointmentSteps = ({ booking, steps, nxtFxn, closeFxn }) => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [selectedServices, setSelectedServices] = React.useState(
    singleBookingData.selected_services
  );
  const [refresh, setRefresh] = React.useState(1);

  const setBookingDetail = React.useCallback(
    (key, value, initiateBooking = false) => {
      //console.log(key, value);
      if (key !== "none") {
        bookingDetail[key] = value;
      }

      if (initiateBooking) {
        //console.log("initiate...", bookingDetail);
        var d = {
          beauticianIds: [bookingDetail.beautician[0].id],
          bookingDateTime: bookingDetail.date_time,
          checkinDateTime: bookingDetail.date_time,
          checkoutDateTime: bookingDetail.date_time,
          bookingId: booking.id,
          serviceIds: bookingDetail.services.map((item) => item.id),
        };
        for (let m = d.beauticianIds.length; m < d.serviceIds.length; m++) {
          d.beauticianIds.push(d.beauticianIds[0]);
        }
        console.log(d);
        mutate({
          inData: { gql: updateDocument(d) },
          path: `/graphql`,
        });
      }
    }
  );

  const {
    mutate,
    isPending,
    isError: isErrorBooking,
    error: errorBooking,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["book_now"] });
      nxtFxn();
      //success alert here
    },
  });

  const selectService = React.useCallback((service) => {
    setSelectedServices((prev) => {
      let added = false;
      selectedServices.forEach((v, i) => {
        if (v.id === service.id) {
          added = true;
        }
      });
      if (!added) {
        prev.push(service);
      }
      return prev;
    });
    setRefresh(refresh + 1);
    //console.log("selectedServices", selectedServices);
  });

  const removeService = React.useCallback((id) => {
    setSelectedServices((prev) => {
      return selectedServices.filter((item) => item.id != id);
    });
    setRefresh(refresh + 1);
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dataset_booking", { gql: bookingDataset("booking_dataset") }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data && !dataLoaded) {
    let inData = JSON.parse(data.rows);

    services = inData.services;
    resources = inData.resources;
    organization = inData.organization;
    setDataLoaded(true);
  }

  const {
    data: bookingData,
    isLoading: bookingIsLoading,
    isError: bookingIsError,
    error: bookingError,
  } = useQuery({
    queryKey: [
      "dataset_single_booking",
      { gql: singleBookingDataset(booking?.id) },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (bookingData && bookingData.rows.length > 0) {
    singleBookingData = JSON.parse(bookingData.rows);
    //setBookingDetail("beautician", singleBookingData.selected_beautician);
    //console.log("sss", singleBookingData.selected_services);
    //setSelectedServices(singleBookingData.selected_services);
  }

  return (
    <Container>
      {bookingData && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={7}>
            {steps === 0 && services.length > 0 && (
              <ReBookSelectServices
                selectService={selectService}
                services={services}
              />
            )}
            {steps === 1 && (
              <ReBookSelectProfessional
                selected_beautician={singleBookingData?.selected_beautician}
                setBookingDetail={setBookingDetail}
                resources={resources}
              />
            )}
            {steps === 2 && (
              <ReBookSelectTime
                selected_date_time={singleBookingData?.selected_date_time}
                setBookingDetail={setBookingDetail}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={5}>
            <ReBookSelectedServices
              organization={organization}
              selectedServices={selectedServices}
              removeService={removeService}
              setBookingDetail={setBookingDetail}
              steps={steps}
              nxtFxn={nxtFxn}
              closeFxn={closeFxn}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ReBookAppointmentSteps;
