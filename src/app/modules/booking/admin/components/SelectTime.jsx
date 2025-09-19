import React from "react";
import { BATitle } from "@app/_styles/BookAppointment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const SelectTime = ({ setBookingDetail }) => {
  return (
    <>
      <BATitle sx={{ marginBottom: "25px" }}>Select Time</BATitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            onChange={(date) => {
              setBookingDetail("date_time", new Date(date));
            }}
            label="Select Date And Time"
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default SelectTime;
