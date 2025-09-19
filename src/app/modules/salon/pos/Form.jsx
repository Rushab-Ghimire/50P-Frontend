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
import { Div } from "@jumbo/shared";
import EntityTypeDropDown from "@app/_components/dropdowns/EntityTypeDropDown";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  entity_type_id: Yup.string().required("Resource Type is required"),
});

function PosForm() {
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
    queryKey: ["pos", { id: params.pos_id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData:
          params.pos_id === undefined
            ? -1
            : { gql: getDocument(params.pos_id) },
      }),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      sweetAlerts(
        "success",
        params.pos_id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate(`/salon/floorplan/${params.id}/pos`);
    },
  });

  function handleSubmit(d) {
    //console.log("form-data", d);

    if (params.pos_id === undefined)
      mutate({
        inData: { gql: createDocument(d) },
        path: "/graphql",
      });
    else {
      d = { ...d, id: params.pos_id };
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
          {params.pos_id === undefined && t("Add New Point fo Sales")}
          {params.pos_id !== undefined && t("Edit Point of Sales")}
        </BFormTitle>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <JumboInput
              className={"hideInput "}
              size="small"
              fullWidth
              defaultValue={
                params.pos_id === undefined ? params.id : data?.floorplan?.id
              }
              fieldName={"floorplan_id"}
              label={"floorplan_id"}
              sx={{ marginTop: "25px", display: "none" }}
            />
            <JumboInput
              fullWidth
              size="small"
              defaultValue={65}
              fieldName={"entity_type_id"}
              label={"entity_type_id"}
              sx={{ marginTop: "25px", display: "none" }}
            />

            <JumboInput
              fullWidth
              size="small"
              defaultValue={data?.title}
              fieldName={"title"}
              label={"Title"}
              sx={{}}
            />

            <JumboInput
              fullWidth
              size="small"
              defaultValue={data?.position}
              fieldName={"position"}
              label={"Position"}
              sx={{ marginTop: "25px" }}
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
                navigate(`/salon/floorplan/${params.id}/pos`);
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
export default PosForm;
