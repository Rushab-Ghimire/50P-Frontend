import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import {
  queryClient,
  log,
  sweetAlerts,
  gqlQuery,
  gqlMutate,
} from "@app/_utilities/http.js";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import {
  Alert,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getDocument, createDocument, updateDocument } from "./Documents";
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import { Div } from "@jumbo/shared";
import EntityTypeDropDown from "@app/_components/dropdowns/EntityTypeDropDown";
import { BATitle } from "@app/_styles/BookAppointment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PhoneInput from "react-phone-input-2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getProviderTimeSlotsByDateDocument } from "../Timeslots/Documents";
import { DocFormLabel } from "@app/modules/AskDaysi/styles/admin/doctor";
import { CircularProgressLoader } from "@app/_styles/ModuleModal";
import moment from "moment";
import { getFormattedDate } from "@app/_utilities/helpers";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  phone: Yup.string().required("Phone is required"),
  time: Yup.string().required("Select Appointment Time"),
});

var timeSet = [];

const formStyle = {
  marginTop: "20px",
};

const ButtonStyles = {
  width: "90px",
  border: "1px solid #ccc !important",
  padding: "6px 12px",
  fontWeight: "400",
  borderRadius: "8px !important",
};

const toggleStyle = {
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "10px",
  width: "100%",
  "& .Mui-selected": {
    border: "1px solid #6dcff6 !important",
    borderRadius: "8px",
    backgroundColor: "#6dcff6 !important",
    color: "#fff !important",
  },
};

function ADQueueForm() {
  const [isPendingFetch, setIsPendingFetch] = useState(true);
  const [queueDateTime, setQueueDateTime] = useState(new Date());
  const [phone, setPhone] = React.useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const params = useParams();

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const [loadingTimeslots, setLoadingTimeslots] = useState(false);
  useEffect(() => {
    renderTimeSlots();
  }, []);

  const renderTimeSlots = useCallback((d) => {
    setTime("");
    if (d === undefined) {
      d = new Date();
    }
    setLoadingTimeslots(true);
    mutate({
      inData: {
        gql: getProviderTimeSlotsByDateDocument(d),
      },
      path: `/graphql`,
      onSuccess: (dx) => {
        setLoadingTimeslots(false);
        timeSet = [];
        if (dx.getProviderTimeSlotsByDate.data[0] === undefined) {
          return;
        }
        dx.getProviderTimeSlotsByDate.data[0].slots.map((i) => {
          timeSet.push({
            id: i.id,
            slot: i.slot,
            time: getFormattedDate(
              moment(i.fullDateTime, "YYYY-MM-DD HH:mm").toDate(),
              "hh:mm a"
            ),
          });
        });

        setLoadingTimeslots(false);
      },
    });
  });

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["queue", { id: params.id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: params.id === undefined ? -1 : { gql: getDocument(params.id) },
      }),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  function handleSubmit(d) {
    d.queueDateTime = queueDateTime;
    console.log("form-data", d);

    var datePart = getFormattedDate(queueDateTime, "YYYY-MM-DD");
    datePart = datePart + " " + time;
    var bookDTime = moment(datePart).toDate();
    d.queueDateTime = bookDTime;

    // console.log("ddd", d, time);
    // return;

    if (params.id === undefined)
      mutate({
        onError: (e) => {
          setFormError({ isError: true, message: e.error });
        },
        onSuccess: (e) => {
          queryClient.invalidateQueries({ queryKey: ["queue"] });
          sweetAlerts(
            "success",
            params.id === undefined ? "Added..." : "Updated...",
            Swal,
            theme
          );
          navigate("/askdaysi/queue");
        },
        inData: { gql: createDocument(d) },
        path: "/graphql",
      });
    else {
      d = { ...d, id: params.id };
      mutate({
        inData: { gql: updateDocument(d) },
        path: `/graphql`,
        onError: (e) => {
          setFormError({ isError: true, message: e.error });
        },
        onSuccess: (e) => {
          queryClient.invalidateQueries({ queryKey: ["queue"] });
          sweetAlerts(
            "success",
            params.id === undefined ? "Added..." : "Updated...",
            Swal,
            theme
          );
          navigate("/askdaysi/queue");
        },
      });
    }
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const [time, setTime] = useState();

  const handleTime = (event, newTime) => {
    setTime(newTime);
  };

  return (
    <>
      {/* <Typography variant={"h2"}>
        {params.id === undefined && t("Add New Business")}
        {params.id !== undefined && t("Edit Business")}
      </Typography> */}
      {isLoadingFetch && "Fetching..."}
      {isErrorFetch && (
        <ErrorBlock
          title="Failed to fetch"
          message={
            errorFetch.info?.message ||
            "Failed to fetch. Please try again later."
          }
        />
      )}

      <JumboCard contentWrapper>
        <BFormTitle variant={"h3"}>
          {params.id === undefined && t("Add New Booking Queue")}
          {params.id !== undefined && t("Edit Booking Queue")}
        </BFormTitle>
        {formError.isError && (
          <Alert sx={{ marginBottom: "10px" }} severity="error">
            {formError.message}
          </Alert>
        )}
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <JumboInput
              fullWidth
              defaultValue={data?.customer?.firstName}
              fieldName={"firstName"}
              label={"First Name"}
              size="small"
              sx={{ marginBottom: "25px" }}
            />

            <JumboInput
              fullWidth
              defaultValue={data?.customer?.lastName}
              fieldName={"lastName"}
              label={"Last Name"}
              size="small"
              sx={{ marginBottom: "25px" }}
            />

            <JumboInput
              fullWidth
              defaultValue={data?.customer?.email}
              fieldName={"email"}
              label={"Email"}
              size="small"
              sx={{ marginBottom: "25px" }}
            />

            <PhoneInput
              size="small"
              international={true}
              withCountryCallingCode={true}
              country={"us"}
              value={data?.customer?.phone}
              onChange={(phoneN) => {
                setPhone("+" + phoneN);
              }}
            />
            <JumboInput
              className={"hideInputPhone"}
              fieldName={"phone"}
              defaultValue={phone}
              value={phone}
            ></JumboInput>

            <JumboInput
              fullWidth
              defaultValue={data?.note}
              fieldName={"note"}
              label={"Note"}
              size="small"
              sx={{ marginBottom: "25px", marginTop: "25px" }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  defaultValue={dayjs(queueDateTime)}
                  onChange={(date) => {
                    setQueueDateTime((d) => new Date(date));
                    renderTimeSlots(new Date(date));
                  }}
                  label="Select Date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={formStyle}>
            <DocFormLabel sx={{ mb: 1 }}>Select Time</DocFormLabel>
            {loadingTimeslots && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CircularProgressLoader />
                <Typography variant="h4">
                  Loading Available Timeslots
                </Typography>
              </Box>
            )}
            {!loadingTimeslots && timeSet.length <= 0 && (
              <Alert severity="error">
                <Typography variant="h4">
                  No Timeslots Available for this Date.
                </Typography>
              </Alert>
            )}
            {!loadingTimeslots && timeSet.length > 0 && (
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                sx={toggleStyle}
              >
                {timeSet.map((data, index) => (
                  <ToggleButton key={index} value={data.slot} sx={ButtonStyles}>
                    {data.time}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}

            <JumboInput
              className={"hideInputPhone"}
              fieldName={"time"}
              defaultValue={time}
              value={time}
            ></JumboInput>
          </Box>

          <Box sx={{ display: "flex", gap: "15px", marginTop: "25px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                navigate("/askdaysi/queue");
              }}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </JumboForm>
      </JumboCard>
    </>
  );
}
export default ADQueueForm;
