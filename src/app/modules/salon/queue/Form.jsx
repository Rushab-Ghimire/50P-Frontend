import React, { useState } from "react";
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
import { Box, Button, Typography } from "@mui/material";
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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  phone: Yup.string().required("Phone is required"),
});

function QueueForm() {
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
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["queue"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/salon/queue");
    },
  });

  function handleSubmit(d) {
    d.queueDateTime = queueDateTime;
    //console.log("form-data", d);

    if (params.id === undefined)
      mutate({
        inData: { gql: createDocument(d) },
        path: "/graphql",
      });
    else {
      d = { ...d, id: params.id };
      mutate({
        inData: { gql: updateDocument(d) },
        path: `/graphql`,
      });
    }
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
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
      {formError.isError && <Alert severity="error">{formError.message}</Alert>}

      <JumboCard contentWrapper>
        <BFormTitle variant={"h3"}>
          {params.id === undefined && t("Add New Booking Queue")}
          {params.id !== undefined && t("Edit Booking Queue")}
        </BFormTitle>
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
              className="mb-25"
              sx={{ marginBottom: "25px" }}
              onChange={(phoneN) => {
                setPhone("+" + phoneN);
              }}
            />
            <JumboInput
              className={"hideInput"}
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
              sx={{ marginBottom: "25px" }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  defaultValue={dayjs(data?.queueDateTime)}
                  onChange={(date) => {
                    setQueueDateTime((prev) => new Date(date));
                  }}
                  label="Select Date And Time"
                />
              </DemoContainer>
            </LocalizationProvider>
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
                navigate("/salon/queue");
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
export default QueueForm;
