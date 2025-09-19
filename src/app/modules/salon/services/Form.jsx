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
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import CategoryDropDown from "@app/_components/dropdowns/CategoryDropDown";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
});

function ServiceForm() {
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
    queryKey: ["service", { id: params.id }],
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
      queryClient.invalidateQueries({ queryKey: ["service"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/salon/services");
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
          {params.id === undefined && t("Add New Service")}
          {params.id !== undefined && t("Edit Service")}
        </BFormTitle>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <CategoryDropDown
              entity_type_id="62"
              name="categoryId"
              selected={data?.category?.id}
            />
            <JumboInput
              fullWidth
              defaultValue={data?.code}
              fieldName={"code"}
              label={"Service Code"}
              size="small"
              sx={{ marginBottom: "25px", marginTop: "25px" }}
            />
            <JumboInput
              fullWidth
              defaultValue={data?.title}
              fieldName={"title"}
              label={"Title"}
              size="small"
              sx={{ marginBottom: "25px" }}
            />
            <JumboInput
              fullWidth
              defaultValue={data?.costPrice}
              fieldName={"costPrice"}
              label={"Cost Price"}
              size="small"
              sx={{ marginBottom: "25px" }}
            />
            <JumboInput
              fullWidth
              defaultValue={data?.salesPrice}
              fieldName={"salesPrice"}
              label={"Sales Price"}
              size="small"
              sx={{ marginBottom: "25px" }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "15px" }}>
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
                navigate("/salon/services");
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
export default ServiceForm;
