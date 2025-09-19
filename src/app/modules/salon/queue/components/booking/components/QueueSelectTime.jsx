import React, { useEffect } from "react";
import { BATitle } from "@app/_styles/BookAppointment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const QueueSelectTime = ({ setBookingDetail, queue }) => {
  useEffect(() => {
    setBookingDetail("date_time", queue.start);
  }, [queue]);

  return (
    <>
      <BATitle sx={{ marginBottom: "25px" }}>Select Time</BATitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            defaultValue={dayjs(queue.start)}
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

export default QueueSelectTime;
