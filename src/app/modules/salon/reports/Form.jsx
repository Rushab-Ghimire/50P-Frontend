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
import { getDocument, createDocument, updateDocument } from "./Documents";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
});

function BusinessForm() {
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
    queryKey: ["business", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["business"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/business");
    },
  });

  function handleSubmit(d) {
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
      <Typography variant={"h2"}>
        {params.id === undefined && t("Add New Business")}
        {params.id !== undefined && t("Edit Business")}
      </Typography>
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

      <JumboForm
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onChange={handleOnChange}
      >
        <JumboInput
          fullWidth
          defaultValue={data?.title}
          fieldName={"title"}
          label={"title"}
        />

        <JumboInput
          fullWidth
          defaultValue={data?.description}
          fieldName={"description"}
          label={"description"}
        />

        <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate("/business");
            }}
            type="button"
          >
            Cancel
          </Button>
        </Box>
      </JumboForm>
    </>
  );
}
export default BusinessForm;
