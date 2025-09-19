import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
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
import {
  uiDocument,
  getDocument,
  createDocument,
  updateDocument,
} from "./Documents";

function ProcessFlowForm() {
  const [isPendingFetch, setIsPendingFetch] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const params = useParams();

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const {
    data: ui_json,
    isLoading: isLoadingUI,
    isError: isErrorUI,
    error: errorUI,
  } = useQuery({
    queryKey: ["processflow-ui", {}],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: uiDocument, json_key: ["ui"] },
      }),
  });

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["processflow", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["processflow"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/process-flow");
    },
  });

  function handleSubmit(d) {
    if (params.id === undefined)
      mutate({
        inData: { gql: createDocument(d.formData) },
        path: "/graphql",
      });
    else
      mutate({
        inData: { gql: updateDocument(d.formData) },
        path: `/graphql`,
      });
  }

  return (
    <>
      <Typography variant={"h2"}>
        {params.id === undefined && t("Add New Process Flow")}
        {params.id !== undefined && t("Edit Process Flow")}
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
      {isLoadingUI && <p>Loading UI...</p>}
      {!isLoadingUI && (
        <Form
          className="tflex"
          showErrorList={false}
          noHtml5Validate={true}
          formData={data}
          uiSchema={ui_json.ui.fieldSchema}
          schema={ui_json.ui.fields}
          validator={validator}
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                navigate("/process-flow");
              }}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </Form>
      )}
    </>
  );
}
export default ProcessFlowForm;
