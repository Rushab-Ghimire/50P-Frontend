import React from "react";
import { Grid } from "@mui/material";
import CustomerDetail from "./components/CustomerDetail";
import ServiceDetail from "./components/ServiceDetail";
import ServiceTotal from "./components/ServiceTotal";
import { getOrderDetail } from "@app/modules/salon/sales/Documents";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import OrderReceipt from "./OrderReceipt";

var data = {
  profile: {
    name: "Sarah Williams",
    email: "sarah@sarahmail.com",
    profile_image: "http://localhost:5173/assets/images/avatar/avatar10.jpg",
    phone: "+1 215 456-7890",
    address: "San Jose–San Francisco–Oakland",
  },
  services: [
    {
      title: "Haircut",
      ttl: "30 mins",
      beautician: "Nicollette",
      amount_display: "USD 90",
    },
    {
      title: "Beard Trim",
      ttl: "1hr 30 mins",
      beautician: "Lasha",
      amount_display: "USD 120",
    },
    {
      title: "Hair Trim & Blow",
      ttl: "1hr 30 mins",
      beautician: "Rasha",
      amount_display: "USD 150",
    },
  ],
  service_total: {
    payment_mode: "Bank",
    sub_total: "405",
    sub_total_display: "USD 405",
    taxes: [
      {
        key: "SGST Tax",
        value: "2.5%",
        amount: "25",
        amount_display: "USD 25",
      },
      {
        key: "CGST Tax",
        value: "3%",
        amount: "25",
        amount_display: "USD 25",
      },
    ],
    total: "450",
    total_display: "USD 455",
  },
};

const InvoiceDetail = ({ order_id = -1 }) => {
  const {
    data: dataInvoice,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["invoice", { id: order_id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: order_id === undefined ? -1 : { gql: getOrderDetail(order_id) },
      }),
  });

  if (dataInvoice && order_id != -1) {
    if (dataInvoice.rows) {
      data = JSON.parse(dataInvoice.rows);
    }
  }

  return (
    <Grid container spacing={4} sx={{ padding: "25px 40px 0 40px" }}>
      <Grid item xs={12} md={7}>
        <CustomerDetail profile={data.profile} />
        <ServiceDetail services={data.services} />
      </Grid>
      <Grid item xs={12} md={5}>
        <ServiceTotal order_id={order_id} service_total={data.service_total} />
      </Grid>
    </Grid>
  );
};

export default InvoiceDetail;
