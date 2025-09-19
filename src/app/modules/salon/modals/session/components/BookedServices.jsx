import React, { useState, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  BACusAvatar,
  BACusBooked,
  BACusDetail,
  BACusName,
  BACusProDetail,
  BACusProDetailWrapper,
  BACusProWapper,
} from "@app/_styles/BookAppointment";
import profilePic from "/assets/images/avatar/avatar10.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { getFormattedDate } from "@app/_utilities/helpers";
import { GLOBAL } from "@app/_utilities/globals";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const iconStyles = {
  position: "relative",
  top: "7px",
  // color: "#686868",
  fontSize: "22px",
  marginRight: "5px",
};

const BookedServices = ({
  fxn,
  bookingData,
  updateServiceStatus,
  cancelBooking,
}) => {
  const [selectedPOS, setSelectedPOS] = useState([]);
  const [refresh, setRefresh] = useState(1);
  //const [bookingData, setBookingData] = useState(bookingDataIn);

  const handleChange = (event, booking_service_id) => {
    setSelectedPOS((prev) => {
      prev[booking_service_id] = event.target.value;
      return prev;
    });
    setRefresh(refresh + 1);
  };

  const cancelBookingService = useCallback((booking_service_id) => {
    updateServiceStatus(booking_service_id, "CANCEL", -1);
    setStatusInUI(booking_service_id, "cancel");
  });
  const startBookingService = (booking_service_id) => {
    if (
      selectedPOS[booking_service_id] == "-1" ||
      selectedPOS[booking_service_id] === undefined
    ) {
      alert("select pos");
      return;
    }
    updateServiceStatus(
      booking_service_id,
      "START",
      selectedPOS[booking_service_id]
    );
    setStatusInUI(booking_service_id, "running");
  };

  var setStatusInUI = useCallback((booking_service_id, new_status) => {
    var temp = { ...bookingData };
    temp.services.forEach(function (currentValue, index, arr) {
      if (booking_service_id == currentValue.booking_service_id) {
        temp.services[index] = {
          ...temp.services[index],
          status: new_status,
          pos: selectedPOS[booking_service_id],
        };
      }
    });
    GLOBAL.bookingData = temp;
    bookingData = GLOBAL.bookingData;
    setRefresh(refresh + 1);
  });

  const endBookingService = useCallback((booking_service_id) => {
    updateServiceStatus(booking_service_id, "END", -1);
    setStatusInUI(booking_service_id, "end");
  });

  const cancelThisBooking = useCallback((booking_id) => {
    cancelBooking(booking_id);
  });

  //console.log("bookingData", bookingData);

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
          <Stack>
            <BACusName variant="h3">Booking Details</BACusName>
            <BACusProDetail variant="h6">
              <EventAvailableOutlinedIcon sx={iconStyles} />
              {getFormattedDate(bookingData?.booking_date)}
            </BACusProDetail>
          </Stack>
        </BACusProWapper>
        <BACusBooked variant="h3"></BACusBooked>
        <DialogContentText>
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontSize: "16px" }}>
                    Services
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "16px" }}>
                    Service Status
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "16px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingData?.services?.map((service) => (
                  <TableRow
                    key={"bs-" + service.booking_service_id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">
                      {service.title} <br />
                      Beautician: {service.beautician} <br /> {service.ttl}
                    </TableCell>

                    {service.pos?.id ? (
                      <TableCell align="left">
                        {service.pos.title} <br />
                        {service.status == "end" ? "completed" : service.status}
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        {service.status == "cancel" && <>Cancelled</>}
                        {service.status != "cancel" && (
                          <FormControl fullWidth>
                            <Select
                              key={service.booking_service_id}
                              defaultValue={
                                selectedPOS[service.booking_service_id]
                                  ? selectedPOS[service.booking_service_id]
                                  : -1
                              }
                              value={
                                selectedPOS[service.booking_service_id]
                                  ? selectedPOS[service.booking_service_id]
                                  : -1
                              }
                              size="small"
                              onChange={(event) =>
                                handleChange(event, service.booking_service_id)
                              }
                            >
                              <MenuItem value="-1">
                                Select Delivery PoS
                              </MenuItem>
                              {bookingData?.pos.map((item) => (
                                <MenuItem
                                  key={
                                    item.id + "_" + service.booking_service_id
                                  }
                                  value={item.id}
                                >
                                  {item.title}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                    )}

                    <TableCell align="left">
                      {service.status == "cancel" && (
                        <>
                          <CancelOutlinedIcon color="error" />{" "}
                          <Typography
                            variant="span"
                            color="error"
                            sx={{ position: "relative", top: "-7px" }}
                          >
                            Cancelled
                          </Typography>
                        </>
                      )}
                      {service.status == "end" && (
                        <>
                          <CheckCircleOutlineOutlinedIcon color="success" />{" "}
                          <Typography
                            variant="span"
                            sx={{
                              position: "relative",
                              top: "-7px",
                              color: "#3bd2a2",
                            }}
                          >
                            Completed
                          </Typography>
                        </>
                      )}
                      {service.status != "cancel" &&
                        service.status != "end" && (
                          <ButtonGroup>
                            {service.pos?.id || service.status == "running" ? (
                              <Button
                                onClick={() => {
                                  endBookingService(service.booking_service_id);
                                }}
                                variant="outlined"
                                size="small"
                                color="error"
                                sx={{ minWidth: "60px !important" }}
                              >
                                End
                              </Button>
                            ) : (
                              <>
                                <Button
                                  onClick={() => {
                                    startBookingService(
                                      service.booking_service_id
                                    );
                                  }}
                                  variant="outlined"
                                  size="small"
                                  color="error"
                                  sx={{ minWidth: "60px !important" }}
                                >
                                  Start
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    cancelBookingService(
                                      service.booking_service_id
                                    );
                                  }}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </ButtonGroup>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={() => cancelThisBooking(bookingData.booking_id)}
        >
          Cancel Booking
        </Button>
        <Button variant="contained" onClick={fxn}>
          Checkout
        </Button>
      </DialogActions>
    </>
  );
};

export default BookedServices;
