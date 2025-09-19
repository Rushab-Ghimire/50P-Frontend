import React from "react";
import { AppPagination } from "@app/_components/_core";
import { useQuery, useMutation } from "react-query";
import { useRef, useState, useEffect } from "react";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import { LoadingIndicator, TFItem } from "@app/_shared/GeneralUI.jsx";
import { queryDocument } from "./Documents";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import { View } from "@app/_components/_core";

const Process = () => {
  const { t } = useTranslation();
  const searchElement = useRef();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["process", { gql: queryDocument(searchTerm, currentPage) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  let content = "";

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch items."}
      />
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Typography variant={"h2"} mb={3}>
        {t("Processes")}
      </Typography>
      <header>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            maxWidth: "100%",
            justifyContent: "space-between",
            marginBottom: "40px",
            gap: "20px",
          }}
        >
          <Stack>
            <Link to={`/process/new`}>
              <Button variant={"contained"} size={"medium"} color={"primary"}>
                Add New
              </Button>
            </Link>
          </Stack>
          <Stack>
            <form onSubmit={handleSubmit} id="search-form">
              <TextField
                variant="outlined"
                size="small"
                inputRef={searchElement}
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
        </Box>
      </header>
      {content}

      {data && data.rows.length > 0 && (
        <View variant="list" dataSource={data.rows} renderItem={ListItem} />
      )}

      {data && data.rows.length > 0 && (
        <AppPagination
          current_page={currentPage}
          current_rowsPerPage={PER_PAGE}
          totalRows={data["totalCount"]}
          onHandleChangePage={handlePage}
        />
      )}
    </Container>
  );
};

export function ListItem({ item }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Stack>
          <Typography variant={"h4"} sx={{ mb: 0 }}>
            {item.title}
          </Typography>
        </Stack>
        <Stack>
          <ButtonGroup>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={item.isFollowing ? "error" : "primary"}
              onClick={() => {
                navigate(`/process/${item.id}`);
              }}
            >
              Edit
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Card>
  );
}

export default Process;
