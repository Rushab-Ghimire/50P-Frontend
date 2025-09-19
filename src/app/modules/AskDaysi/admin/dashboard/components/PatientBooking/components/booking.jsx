import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { JumboCard } from "@jumbo/components";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getFormattedDate } from "@app/_utilities/helpers";

const PatientsBookingDateTime = ({ bookingDetail }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          Booking
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <EventAvailableOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      <Typography variant={"h4"} fontWeight={"500"}>
        {getFormattedDate(bookingDetail.bookingDateTime, "DD MMMM, YYYY")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <Stack>
          <AccessTimeOutlinedIcon fontSize="small" />
        </Stack>
        <Stack>
          <Typography variant={"h5"} fontWeight={"400"} sx={{ mb: 0 }}>
            {getFormattedDate(bookingDetail.bookingDateTime, "HH:mm a")}
          </Typography>
        </Stack>
      </Box>
    </JumboCard>
  );
};

export default PatientsBookingDateTime;
