import React, { useState, useCallback } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Box,
  Button,
  DialogActions,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  BACusAvatar,
  BACusBooked,
  BACusName,
  BACusProDetail,
  BACusProDetailWrapper,
  BACusProWapper,
  BAOrderTotal,
  BAServicesTitle,
} from "@app/_styles/BookAppointment";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import {
  queryDocument,
  completeOrder,
} from "@app/_components/calendars/components/PopupCalendar/Document";
import profilePic from "/assets/images/avatar/avatar10.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { getFormattedDate } from "@app/_utilities/helpers";

const iconStyles = {
  position: "relative",
  top: "7px",
  // color: "#686868",
  fontSize: "22px",
  marginRight: "5px",
};
const ServicesTotal = ({ fxn, bookingData }) => {
  const [opt, setOpt] = useState(1);

  const handleAlignment = (event, newSetOpt) => {
    setOpt(newSetOpt);
  };

  const confirmOrder = useCallback(() => {
    mutate({
      inData: {
        gql: completeOrder(bookingData.booking_id, opt),
      },
      path: `/graphql`,
    });
    fxn();
  });

  const {
    mutate,
    isPending,
    isError: isErrorStatus,
    error: errorStatus,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["booking_order_complete"] });
      //success alert here
    },
  });

  return (
    <>
      <DialogContent>
        <BACusProWapper>
          <Stack>
            <BACusProDetailWrapper>
              <Stack>
                <BACusAvatar
                  src={bookingData?.customer?.profile_image}
                  alt="Profile Picture"
                />
              </Stack>
              <Stack>
                <BACusName variant="h3">
                  {bookingData?.customer?.fullName}
                </BACusName>
                <BACusProDetail variant="h6">
                  <EmailOutlinedIcon sx={iconStyles} />
                  {bookingData?.customer?.email}
                </BACusProDetail>
                <BACusProDetail variant="h6">
                  <SmartphoneOutlinedIcon sx={iconStyles} />
                  {bookingData?.customer?.phone}
                </BACusProDetail>
                {bookingData?.customer?.address && (
                  <BACusProDetail variant="h6">
                    <LocationOnOutlinedIcon sx={iconStyles} />
                    {bookingData?.customer?.address}
                  </BACusProDetail>
                )}
              </Stack>
            </BACusProDetailWrapper>
          </Stack>
        </BACusProWapper>

        <DialogContentText>
          <BAOrderTotal>
            <Stack>
              <BACusName variant="h3">Booking Details</BACusName>
              <BACusProDetail variant="h6">
                <EventAvailableOutlinedIcon sx={iconStyles} />
                {getFormattedDate(bookingData?.booking_date)}
              </BACusProDetail>
            </Stack>
            <Stack>
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                Pay VIA
              </Typography>
              <ToggleButtonGroup
                value={opt}
                exclusive
                onChange={handleAlignment}
              >
                <ToggleButton value="1" size="small">
                  Cash
                </ToggleButton>
                <ToggleButton value="2" size="small">
                  Bank
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Stack>
              <Box sx={{ display: "flex", gap: "20px", textAlign: "right" }}>
                <Stack textAlign={"left"}>
                  <Typography variant="h5">Sub-Total:</Typography>
                  {bookingData?.totals?.taxes.map((item) => (
                    <Typography variant="h5">{item.key}:</Typography>
                  ))}
                  <Typography variant="h5" sx={{ fontWeight: "500" }}>
                    Total:
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h5">
                    {bookingData?.totals?.subtotal}
                  </Typography>
                  {bookingData?.totals?.taxes.map((item) => (
                    <Typography variant="h5">{item.value}</Typography>
                  ))}
                  <Typography variant="h5" sx={{ fontWeight: "500" }}>
                    {bookingData?.totals?.total}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </BAOrderTotal>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={confirmOrder}>
          Confirm Order
        </Button>
      </DialogActions>
    </>
  );
};

export default ServicesTotal;
