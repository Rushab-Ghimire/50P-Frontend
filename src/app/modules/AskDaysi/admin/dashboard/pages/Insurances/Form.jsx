import React, { useCallback, useRef, useState } from "react";
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
import { Box, Button, Stack, Typography } from "@mui/material";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getDocument, createDocument, updateDocument } from "./Documents";
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import { Div } from "@jumbo/shared";
import EntityTypeDropDown from "@app/_components/dropdowns/EntityTypeDropDown";
import AddressDropDown from "@app/modules/AskDaysi/public/components/form-components/AddressDropDown";
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";
import InsuranceSelector from "@app/modules/AskDaysi/public/components/form-components/InsuranceSelector";
import { useArrayState } from "@app/_utilities/helpers";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});
var formDataUser = {};
function InsurancesForm() {
  const [isPendingFetch, setIsPendingFetch] = useState(true);
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
    queryKey: ["insurance", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["insurance"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/askdaysi/insurances");
    },
  });

  function submitFormData(files_data) {
    if (files_data?._name !== undefined && files_data?._value != "") {
      formDataUser[files_data._name] = files_data._value;
    } else {
      formDataUser[files_data._name] = "";
    }
    //console.log("selInsurances", selInsurances, files_data);
    formDataUser.logo_uuid = formDataUser[files_data._name];

    formDataUser.name =
      formDataUser.name === undefined ? "" : formDataUser.name;
    formDataUser.location =
      formDataUser.location === undefined ? "" : formDataUser.location;
    console.log("formDataUser", formDataUser);
    //return;

    if (params.id === undefined)
      mutate({
        inData: { gql: createDocument(formDataUser) },
        path: "/graphql",
      });
    else {
      formDataUser = { ...formDataUser, id: params.id };
      mutate({
        inData: { gql: updateDocument(formDataUser) },
        path: `/graphql`,
      });
    }
  }

  function handleSubmit(d) {
    formDataUser = d;
    imageRef.current.doUpload(submitFormData);
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const imageRef = useRef();

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
          {params.id === undefined && t("Add New Insurance Provider")}
          {params.id !== undefined && t("Edit Insurance Provider")}
        </BFormTitle>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ marginTop: "-25px" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                marginTop: "25px",
                [theme.breakpoints.down("md")]: { flexDirection: "column" },
              }}
            >
              <Stack sx={{ flex: 1 }}>
                <JumboInput
                  fullWidth
                  defaultValue={data?.name}
                  fieldName={"name"}
                  label={"Title"}
                  sx={{ marginTop: "25px" }}
                  size="small"
                />
                <JumboInput
                  fullWidth
                  defaultValue={data?.location}
                  fieldName={"location"}
                  label={"Location"}
                  sx={{ marginTop: "25px" }}
                  size="small"
                />
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <SingleFileUploader
                  app="askdaysi"
                  field_name={"unique_id"}
                  unique_id={data?.logoUuid}
                  file_key="LOGO"
                  owner_type="organization"
                  ref={imageRef}
                />
              </Stack>
            </Box>
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
                navigate("/askdaysi/insurances");
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
export default InsurancesForm;
