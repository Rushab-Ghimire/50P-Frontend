import React from "react";
import {
  BACusAvatar,
  BACusName,
  BACusProDetail,
  BACusProDetailWrapper,
  BACusProWapper,
  BAServices,
  BAServicesPrice,
  BAServicesTime,
  BAServicesTitle,
} from "@app/_styles/BookAppointment";
import { Divider, Stack } from "@mui/material";

const serviceList = [
  {
    id: 1,
    title: "Hair Cut",
    beautician: "Nicollette",
    time: "30 mins",
    currency: "USD",
    price: "90",
  },
  {
    id: 2,
    title: "Hair Trim & Blow",
    beautician: "Rasha",
    time: "1hr 30 mins",
    currency: "USD",
    price: "150",
  },
  {
    id: 3,
    title: "Beard Trim",
    beautician: "Loubna",
    time: "45 mins",
    currency: "USD",
    price: "120",
  },
  {
    id: 4,
    title: "Head Message",
    beautician: "Lasha",
    time: "15 mins",
    currency: "USD",
    price: "45",
  },
];
const ServiceDetail = ({ services }) => {
  return (
    <>
      <BACusName variant="h3" sx={{ marginBottom: "5px" }}>
        Service Details
      </BACusName>
      <Divider sx={{ marginBottom: "10px" }} />
      {services.map((data, index) => (
        <BAServices key={index}>
          <Stack>
            <BAServicesTitle variant="h3">{data.title}</BAServicesTitle>
            <BAServicesTime>Beautician: {data.beautician}</BAServicesTime>
            <BAServicesTime>{data.ttl}</BAServicesTime>
          </Stack>
          <Stack>
            <BAServicesPrice>{data.amount_display}</BAServicesPrice>
          </Stack>
        </BAServices>
      ))}
    </>
  );
};

export default ServiceDetail;
