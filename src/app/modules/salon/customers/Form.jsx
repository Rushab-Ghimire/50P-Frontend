import React, { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
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
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";
import PhoneInput from "react-phone-input-2";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
});

var formDataCustomer = {};
function CustomerForm() {
  const [isPendingFetch, setIsPendingFetch] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadFile, setUploadFile] = useState(false);
  const imageRef = useRef();
  const [phone, setPhone] = React.useState("");

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
    queryKey: ["customer", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/salon/customer");
    },
  });

  function submitFormData(files_data) {
    //console.log("all completed", formDataCustomer);

    if (files_data?._name !== undefined && files_data?._value != "") {
      formDataCustomer[files_data._name] = files_data._value;
    }

    if (params.id === undefined)
      mutate({
        inData: { gql: createDocument(formDataCustomer) },
        path: "/graphql",
      });
    else {
      formDataCustomer = { ...formDataCustomer, id: params.id };
      mutate({
        inData: { gql: updateDocument(formDataCustomer) },
        path: `/graphql`,
      });
    }
  }

  function handleSubmit(d) {
    formDataCustomer = d;
    if (imageRef.current) {
      imageRef.current.doUpload(submitFormData);
    } else {
      submitFormData();
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
          {params.id === undefined && t("Add New Customer")}
          {params.id !== undefined && t("Edit Customer")}
        </BFormTitle>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <JumboInput
              disabled={uploadFile}
              size="small"
              fullWidth
              defaultValue={data?.firstName}
              fieldName={"firstName"}
              label={"First Name"}
              sx={{ marginBottom: "25px" }}
            />
            <JumboInput
              disabled={uploadFile}
              size="small"
              fullWidth
              defaultValue={data?.lastName}
              fieldName={"lastName"}
              label={"Last Name"}
              sx={{ marginBottom: "25px" }}
            />
            <JumboInput
              disabled={uploadFile}
              size="small"
              fullWidth
              defaultValue={data?.email}
              fieldName={"email"}
              label={"Email"}
              sx={{ marginBottom: "25px" }}
            />

            <PhoneInput
              size="small"
              international={true}
              withCountryCallingCode={true}
              country={"us"}
              value={data?.phone}
              className="mb-20"
              sx={{ marginBottom: "25px" }}
              onChange={(phoneN) => {
                setPhone("+" + phoneN);
              }}
            />
            <JumboInput
              className={"hideInput"}
              disabled={uploadFile}
              fieldName={"phone"}
              defaultValue={phone}
              value={phone}
            ></JumboInput>

            <SingleFileUploader
              owner_id={data?.id}
              file_key="PROFILE_IMAGE"
              owner_type="customer"
              ref={imageRef}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "15px", marginTop: "20px" }}>
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
                navigate("/salon/customer");
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
export default CustomerForm;
