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
  title: Yup.string().required("Title is required"),
  address: Yup.string().required("Address is required"),
});
var formDataUser = {};
function ClinicsForm() {
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
    queryKey: ["clinics", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/askdaysi/clinics");
    },
  });

  function submitFormData(files_data) {
    formDataUser.title =
      formDataUser.title === undefined ? "" : formDataUser.title;
    formDataUser.address =
      formDataUser.address === undefined ? "" : formDataUser.address;
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
    submitFormData();
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
          {params.id === undefined && t("Add New Clinic")}
          {params.id !== undefined && t("Edit Clinic")}
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
                  defaultValue={data?.title}
                  fieldName={"title"}
                  label={"Title"}
                  sx={{ marginTop: "25px" }}
                  size="small"
                />
                <JumboInput
                  fullWidth
                  defaultValue={data?.address}
                  fieldName={"address"}
                  label={"Address"}
                  sx={{ marginTop: "25px" }}
                  size="small"
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
                navigate("/askdaysi/clinics");
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
export default ClinicsForm;
