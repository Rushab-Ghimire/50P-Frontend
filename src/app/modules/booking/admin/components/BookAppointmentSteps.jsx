import { Container, Grid } from "@mui/material";
import React from "react";
import SelectedServices from "./SelectedServices";
import SelectServices from "./SelectServices";
import SelectProfessional from "./SelectProfessional";
import SelectTime from "./SelectTime";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { bookingDataset, bookingDocument } from "./Document";

var services = [];
var resources = [];
var organization = {};
var bookingDetail = {};

const BookAppointmentSteps = ({ steps, nxtFxn }) => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [refresh, setRefresh] = React.useState(1);

  const setBookingDetail = React.useCallback(
    (key, value, initiateBooking = false) => {
      bookingDetail[key] = value;

      if (initiateBooking) {
        console.log("initiate...", bookingDetail);
        var d = {
          beauticianIds: [bookingDetail.beautician.id],
          bookingDateTime: bookingDetail.date_time,
          checkinDateTime: bookingDetail.date_time,
          checkoutDateTime: bookingDetail.date_time,
          customerId: bookingDetail.customer.customer_id,
          serviceIds: bookingDetail.services.map((item) => item.id),
        };
        for (let m = d.beauticianIds.length; m < d.serviceIds.length; m++) {
          d.beauticianIds.push(d.beauticianIds[0]);
        }
        console.log(d);
        mutate({
          inData: { gql: bookingDocument(d) },
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

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          {steps === 0 && services.length > 0 && (
            <SelectServices selectService={selectService} services={services} />
          )}
          {steps === 1 && (
            <SelectProfessional
              setBookingDetail={setBookingDetail}
              resources={resources}
            />
          )}
          {steps === 2 && <SelectTime setBookingDetail={setBookingDetail} />}
        </Grid>
        <Grid item xs={12} lg={5}>
          <SelectedServices
            organization={organization}
            selectedServices={selectedServices}
            removeService={removeService}
            setBookingDetail={setBookingDetail}
            steps={steps}
            nxtFxn={nxtFxn}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookAppointmentSteps;
