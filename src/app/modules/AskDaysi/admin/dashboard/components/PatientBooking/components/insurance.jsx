import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { JumboCard } from "@jumbo/components";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { gqlQuery } from "@app/_utilities/http";
import { gql } from "graphql-request";

export const getADFile = (unique_id = -1) => {
  return gql`
      query Query {
        adFileByUniqueId(uniqueId: "${unique_id}")
      }
    `;
};

var fileInsurance = "";
var fileReport = "";

const PatientsInsurance = ({ bookingDetail }) => {
  const [refresh, setRefresh] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "insurance_file",
      {
        gql: getADFile(bookingDetail.insuranceFileUuid),
      },
    ],
    onSuccess: (dx) => {
      fileInsurance = dx;
      setRefresh(refresh + 1);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: queryKey[1],
      }),
  });

  const {
    dataReport,
    isLoading: isLoadingReport,
    isError: isErrorReport,
    error: errorReport,
  } = useQuery({
    queryKey: [
      "medical_report",
      {
        gql: getADFile(bookingDetail.reportFileUuid),
      },
    ],
    onSuccess: (dx) => {
      fileReport = dx;
      console.log("fileReport", fileReport);
      setRefresh(refresh + 1);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: queryKey[1],
      }),
  });

  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          File(s)
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
              window.open(fileReport, "_blank");
            }}
            to={fileReport}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Typography variant={"h5"} fontWeight={"400"} sx={{ mb: 0 }}>
              Medical Report
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
              window.open(fileInsurance, "_blank");
            }}
            to={fileInsurance}
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
  );
};

export default PatientsInsurance;
