import React from "react";
import {
  PAvatar,
  PBtnContainer,
  PDetail,
  PName,
} from "@app/modules/AskDaysi/styles/admin/patient";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import pAvaar from "/assets/images/avatar/avatar5.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { JumboCard } from "@jumbo/components";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link } from "react-router-dom";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { getFormattedDate } from "@app/_utilities/helpers";
import { useQuery } from "react-query";
import { gqlQuery } from "@app/_utilities/http";
import { getADFile } from "../PatientBooking/components/insurance";

const iconStyles = {
  position: "relative",
  top: "5px",
  fontSize: "22px",
  marginRight: "5px",
};
const PatientDetailOnNotification = ({ bookingDetail }) => {
  //console.log("bookingDetail", bookingDetail);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "insurance_file",
      {
        gql: getADFile(bookingDetail.insuranceFileUuid),
      },
    ],
    onSuccess: (dx) => {},
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: queryKey[1],
      }),
  });

  const {
    data: dataReport,
    isLoading: isLoadingReport,
    isError: isErrorReport,
    error: errorReport,
  } = useQuery({
    queryKey: [
      "report_file",
      {
        gql: getADFile(bookingDetail.reportFileUuid),
      },
    ],
    onSuccess: (dx) => {},
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: queryKey[1],
      }),
  });

  return (
    <>
      <Box sx={{ marginBottom: "25px" }}>
        <Stack>
          <PAvatar src={bookingDetail.user.profilePic} alt="Patient Photo" />
          <PName>
            {bookingDetail.user.firstName} {bookingDetail.user.lastName}
          </PName>
          <PDetail>
            <EmailOutlinedIcon sx={iconStyles} />
            {bookingDetail.user.email}
          </PDetail>
          <PDetail>
            <SmartphoneOutlinedIcon sx={iconStyles} />
            {bookingDetail.user.phone ? bookingDetail.user.phone : "-"}
          </PDetail>
          <PDetail>
            <RoomOutlinedIcon sx={iconStyles} />-
          </PDetail>
        </Stack>
      </Box>

      <JumboCard
        title={
          <Typography variant={"h3"} mb={0} fontWeight={"500"}>
            Booking ({bookingDetail.status})
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
              {getFormattedDate(bookingDetail.bookingDateTime, "hh:mm a")}
            </Typography>
          </Stack>
        </Box>
      </JumboCard>
      <JumboCard
        title={
          <Typography variant={"h3"} mb={0} fontWeight={"500"}>
            User Files
          </Typography>
        }
        action={
          <Stack direction={"row"} spacing={1}>
            <SecurityOutlinedIcon fontSize={"medium"} />
          </Stack>
        }
        contentSx={{}}
        contentWrapper={true}
        headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
        sx={{ marginBottom: "25px" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Stack>
            <ArticleOutlinedIcon fontSize="small" />
          </Stack>
          <Stack>
            <Link
              onClick={() => {
                window.open(dataReport, "_blank");
              }}
              to={dataReport}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant={"h5"} fontWeight={"400"} sx={{ mb: 0 }}>
                Report File
              </Typography>
            </Link>
          </Stack>
        </Box>
        <br />
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Stack>
            <ArticleOutlinedIcon fontSize="small" />
          </Stack>
          <Stack>
            <Link
              onClick={() => {
                window.open(data, "_blank");
              }}
              to={data}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant={"h5"} fontWeight={"400"} sx={{ mb: 0 }}>
                Insurance Card
              </Typography>
            </Link>
          </Stack>
        </Box>
      </JumboCard>

      <JumboCard
        title={
          <Typography variant={"h3"} mb={0} fontWeight={"500"}>
            Note To Doctor
          </Typography>
        }
        action={
          <Stack direction={"row"} spacing={1}>
            <EditNoteOutlinedIcon fontSize={"medium"} />
          </Stack>
        }
        contentSx={{}}
        contentWrapper={true}
        headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
        sx={{ marginBottom: "25px" }}
      >
        <TextField
          placeholder="Note to doctor"
          disabled={true}
          value={bookingDetail.customNote}
          multiline
          rows={4}
        />
      </JumboCard>
    </>
  );
};

export default PatientDetailOnNotification;
