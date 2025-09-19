import {
  Box,
  Button,
  Typography,
  ButtonGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState, memo, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useQuery, useMutation } from "react-query";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { Padding } from "@mui/icons-material";
import Modal from "@app/_shared/Modal.jsx";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

import {
  uiDocument,
  getCard,
  createCard,
  updateCard,
} from "@app/modules/AskDaysi/admin/dashboard/components/ContextCard/Documents";

let formDataSubmitted = {};
function ADContextCard({
  buttonLabels = ["Add", "Cancel"],
  handleClose,
  handle,
  c_node = {},
  organization_id,
}) {
  const params = useParams();
  const c_key = c_node["id"];
  //console.log("c_key", c_key);

  const {
    data: ui_json,
    isLoading: isLoadingUI,
    isError: isErrorUI,
    error: errorUI,
  } = useQuery({
    queryKey: ["card-ui", {}],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: uiDocument, json_key: ["ui"] },
      }),
  });

  let newData = [];
  if (c_node["isNew"]) {
    newData = {
      title: "",
      context: "",
      description: "",
      parent: c_node["data"]["parent"],
      organization_id: organization_id,
    };
  }

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = c_node["isNew"]
    ? []
    : useQuery({
        queryKey: ["card", { id: c_key }],
        queryFn: ({ signal, queryKey }) =>
          gqlQuery({
            signal,
            path: "/graphql",
            inData: c_node["isNew"]
              ? -1
              : { gql: getCard(c_key, 0, organization_id) },
          }),
      });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (dataResponse, variables, context) => {
      //console.log("mutation done..", dataResponse, variables, context);
      queryClient.invalidateQueries({ queryKey: ["business"] });

      let id_response = -1;
      if (dataResponse["createCard"])
        id_response = dataResponse["createCard"]["card"]["id"];
      else id_response = dataResponse["updateCard"]["card"]["id"];

      let dNode = {
        ...formDataSubmitted,
        id: id_response,
        c_node: c_node,
      };
      handle(dNode);
    },
  });

  const handleSubmit = useCallback(({ formData }, event) => {
    formData.organization_id = organization_id;
    formDataSubmitted = formData;

    if (c_node["isNew"])
      mutate({
        inData: { gql: createCard(formData) },
        path: "/graphql",
      });
    else
      mutate({
        inData: { gql: updateCard(formData) },
        path: `/graphql`,
      });
  });

  return (
    <Modal onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack flexDirection="column" gap="20px" justifyContent="center">
          {isLoadingUI && <p>Loading UI...</p>}
          {!isLoadingUI && (
            <Form
              className="tflex"
              showErrorList={false}
              noHtml5Validate={true}
              formData={c_node["isNew"] ? newData : data ? data["rows"][0] : []}
              uiSchema={ui_json.ui.fieldSchema}
              schema={ui_json.ui.fields}
              validator={validator}
              onSubmit={handleSubmit}
            >
              <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                <Button type="submit" variant="contained" color="success">
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Stack>
      </Box>
    </Modal>
  );
}

export default memo(ADContextCard);
