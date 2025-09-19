import {
  Box,
  Button,
  Typography,
  ButtonGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useQuery } from "react-query";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { queryClient, gqlQuery } from "@app/_utilities/http.js";
import { Padding } from "@mui/icons-material";
import Modal from "@app/_shared/Modal.jsx";
/*
const allProcess = [
  {
    id: "1",
    title: "Create Contact",
    specs: {},
  },
  {
    id: "2",
    title: "Send Notification",
    specs: {},
  },
  {
    id: "3",
    title: "Send welcome Email",
    specs: {},
  },
  {
    id: "4",
    title: "Send Marketing Email",
    specs: {},
  },
  {
    id: "5",
    title: "Subscribe Newsletter",
    specs: {},
  },
];
*/
import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    process(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          title
        }
    }
    }
`;
};

export default function ADProcessSelector({
  buttonLabels = ["Add", "Cancel"],
  handleClose,
  handle,
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["process", { gql: queryDocument("", 0) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  let btns =
    data === undefined
      ? ""
      : data.rows.map((item) => {
          return (
            <Button
              key={item["id"]}
              className="button-text"
              size="small"
              color="primary"
              variant="contained"
              onClick={() => handle(item)}
            >
              {item["title"]}
            </Button>
          );
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
        <Stack>
          <form id="search-form">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Process"
            />{" "}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
            >
              Search
            </Button>
          </form>
        </Stack>
        <Box
          sx={{
            height: "200px",
            overflow: "auto",
            maxWidth: "300px",
            marginTop: "20px",
            padding: "10px 50px",
          }}
        >
          <Stack flexDirection="column" gap="20px" justifyContent="center">
            {btns}
          </Stack>
        </Box>

        <div className="form-actions">
          {
            <>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={handleClose}
                  className="button-text"
                  variant="contained"
                  size="medium"
                  color="error"
                  sx={{ marginTop: "20px" }}
                >
                  {buttonLabels[1]}
                </Button>
              </Box>
            </>
          }
        </div>
      </Box>
    </Modal>
  );
}
