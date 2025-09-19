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
  JumboSelect,
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
  Box,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  getProviderTimeSlotsByDateDocument,
  providerTimeslotCreateDocument,
  providerTimeslotDeleteDocument,
} from "./Documents";
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
import { getFormattedDate } from "@app/_utilities/helpers";
import { DocFormLabel } from "@app/modules/AskDaysi/styles/admin/doctor";
import moment from "moment";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { LoadingButton } from "@mui/lab";

const validationSchema = Yup.object().shape({
  hrs: Yup.string().required("Hour is required"),
  mins: Yup.string().required("Minutes is required"),
});

var timeSet = [];

const dropDataHrs = [
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "00", label: "00" },
];

const dropDataMins = [
  { value: "00", label: "00" },
  { value: "15", label: "15" },
  { value: "30", label: "30" },
  { value: "45", label: "45" },
];

const toggleStyle = {
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "20px",
  width: "100%",
  "& .Mui-selected": {
    border: "1px solid #6dcff6 !important",
    borderRadius: "8px",
    backgroundColor: "#6dcff6 !important",
    color: "#fff !important",
  },
};

const ButtonStyles = {
  width: "90px",
  border: "1px solid #ccc !important",
  padding: "6px 12px",
  fontWeight: "400",
  borderRadius: "8px !important",
};

function TimeslotManager({ timeslot, handleClose, refreshCalendar }) {
  const [isPendingFetch, setIsPendingFetch] = useState(true);
  const [queueDateTime, setQueueDateTime] = useState(new Date());
  const [phone, setPhone] = React.useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const [hrs, setHrs] = useState("01");
  const handleChangeHrs = useCallback((e) => {
    setHrs((prev) => e.target.value);
  });

  const [mins, setMins] = useState("00");
  const handleChangeMins = useCallback((e) => {
    setMins((prev) => e.target.value);
  });

  const params = useParams();

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const renderTimeSlots = useCallback(() => {
    mutate({
      inData: {
        gql: getProviderTimeSlotsByDateDocument(timeslot.start),
      },
      path: `/graphql`,
      onSuccess: (dx) => {
        setLoading(false);
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
      },
    });
  });

  useEffect(() => {
    renderTimeSlots();
  }, []);

  // const {
  //   data,
  //   isLoading: isLoadingFetch,
  //   isError: isErrorFetch,
  //   error: errorFetch,
  // } = useQuery({
  //   queryKey: ["queue", { id: params.id }],
  //   queryFn: ({ signal, queryKey }) =>
  //     gqlQuery({
  //       signal,
  //       path: "/graphql",
  //       inData: params.id === undefined ? -1 : { gql: getDocument(params.id) },
  //     }),
  // });

  const [loading, setLoading] = useState(false);
  const providerTimeslotCreate = useCallback((d, h, m) => {
    setLoading(true);
    mutate({
      inData: {
        gql: providerTimeslotCreateDocument(d, h, m),
      },
      path: `/graphql`,
      onSuccess: () => {
        renderTimeSlots();
      },
    });
  });

  const providerTimeslotDelete = useCallback((id) => {
    jQuery("#slot-" + id).remove();

    mutate({
      inData: {
        gql: providerTimeslotDeleteDocument(id),
      },
      path: `/graphql`,
      onSuccess: () => {
        refreshCalendar();
      },
    });
  });

  function handleSubmit(d) {
    providerTimeslotCreate(timeslot.item.date, d.hrs, d.mins);
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const {
    mutate,
    isPending,
    isError: isErrorStatus,
    error: errorStatus,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({
        queryKey: ["ad_booking_service_status"],
      });
    },
  });

  const [time, setTime] = useState();

  const handleTime = (event, newTime) => {
    setTime(newTime);
  };

  return (
    <>
      {formError.isError && <Alert severity="error">{formError.message}</Alert>}

      <JumboCard contentWrapper sx={{ margin: "0 30px" }}>
        <BFormTitle variant={"h3"}>
          {params.id === undefined &&
            t(
              "Timeslots for " +
                getFormattedDate(timeslot.item.date, "MMMM DD, YYYY")
            )}
          {params.id !== undefined && t("Edit Booking Queue")}
        </BFormTitle>
        <Box sx={{ marginBottom: "20px" }}>
          <ToggleButtonGroup
            value={time}
            exclusive
            onChange={handleTime}
            sx={toggleStyle}
          >
            {timeSet.map((data, index) => (
              <Box
                id={"slot-" + data.id}
                key={index}
                sx={{ position: "relative" }}
              >
                <IconButton
                  size="small"
                  color="error"
                  aria-label="delete"
                  sx={{
                    position: "absolute",
                    right: "-19px",
                    top: "-18px",
                    zIndex: "5",
                  }}
                  onClick={() => {
                    providerTimeslotDelete(data.id);
                  }}
                >
                  <RemoveCircleOutlineOutlinedIcon fontSize="small" />
                </IconButton>
                <ToggleButton value={data.slot} sx={ButtonStyles}>
                  {data.time}
                </ToggleButton>
              </Box>
            ))}
          </ToggleButtonGroup>
        </Box>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box sx={{ display: "flex", gap: "15px" }}>
            <JumboSelect
              onChange={handleChangeHrs}
              fieldName={"hrs"}
              label="Hours"
              formControl={true}
              options={dropDataHrs}
              value={hrs}
              defaultValue={hrs}
              size="small"
            />

            <JumboSelect
              onChange={handleChangeMins}
              fieldName={"mins"}
              label="Minutes"
              formControl={true}
              options={dropDataMins}
              value={mins}
              defaultValue={mins}
              size="small"
            />
          </Box>

          <Box sx={{ display: "flex", gap: "15px", marginTop: "25px" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              loading={loading}
            >
              Save
            </LoadingButton>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleClose();
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
export default TimeslotManager;
