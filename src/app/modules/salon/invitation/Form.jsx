import React, { useState } from "react";
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
import { getDocument, createDocument } from "./Documents";
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import { Div } from "@jumbo/shared";
import EntityTypeDropDown from "@app/_components/dropdowns/EntityTypeDropDown";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

function InvitationForm() {
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
    queryKey: ["invitation", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["invitation"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/salon/invitation");
    },
  });

  function handleSubmit(d) {
    //console.log("form-data", d);
    d = { ...d, to_user: -1 };
    mutate({
      inData: { gql: createDocument(d) },
      path: "/graphql",
    });
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
          {params.id === undefined && t("Add New Invitation")}
          {params.id !== undefined && t("Edit Invitation")}
        </BFormTitle>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <JumboInput
              fullWidth
              fieldName={"email"}
              label={"Email"}
              size="small"
            />
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
                navigate("/salon/invitation");
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
export default InvitationForm;
